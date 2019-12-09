import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';
import stoneFactory from './factories/stone';
import db from "../server/src/models";

chai.use(chatHttp);
const { expect } = chai;

afterEach('Clean database', function(){
  Object.values(db.sequelize.models).map(function(model) {
    return model.destroy({ truncate: true });
  });
});

describe('Testing the stone endpoints:', () => {
  it('It should create a stone', (done) => {
    const stone = {
      title: 'First Awesome stone'
    };
    chai.request(app)
      .post('/api/v1/stones')
      .set('Accept', 'application/json')
      .send(stone)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          title: stone.title
        });
        done();
      });
  });

  it('It should not create a stone with empty title', (done) => {
    const stone = {
      title: ''
    };
    chai.request(app)
      .post('/api/v1/stones')
      .set('Accept', 'application/json')
      .send(stone)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('It should get all stones', async () => {
    const stone = await stoneFactory();
    const res = await chai.request(app)
      .get('/api/v1/stones')
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data[0]['title']).to.equal(stone.title);
  });

  it('It should get a particular stone', async () => {
    const stone = await stoneFactory();
    const res = await chai.request(app)
      .get(`/api/v1/stones/${stone.id}`)
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data.title).to.equal(stone.title)
  });

  it('It should not get a particular stone with invalid id', (done) => {
    const stoneId = 8888;
    chai.request(app)
      .get(`/api/v1/stones/${stoneId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
          .eql(`Cannot find stone with the id ${stoneId}`);
        done();
      });
  });

  it('It should not get a particular stone with non-numeric id', (done) => {
    const stoneId = 'aaa';
    chai.request(app)
      .get(`/api/v1/stones/${stoneId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a stone', async () => {
    const stone = await stoneFactory();
    const updatedStone = {
      id: stone.id,
      title: 'Updated Awesome stone'
    };
    const res = await chai.request(app)
      .put(`/api/v1/stones/${stone.id}`)
      .set('Accept', 'application/json')
      .send(updatedStone)
    expect(res.status).to.equal(200);
    expect(res.body.data.id).equal(updatedStone.id);
    expect(res.body.data.title).equal(updatedStone.title);
  });


  it('It should delete a stone', async () => {
    const stone = await stoneFactory();
    const res = await chai.request(app)
      .delete(`/api/v1/stones/${stone.id}`)
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data).to.include({});
  });

  it('It should not delete a stone with invalid id', (done) => {
    const stoneId = 777;
    chai.request(app)
      .delete(`/api/v1/stones/${stoneId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
          .eql(`Stone with the id ${stoneId} cannot be found`);
        done();
      });
  });
});