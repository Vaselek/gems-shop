import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';
import stoneFactory from './factories/stone';
import db from "../server/src/models";
import userFactory from "./factories/user";

chai.use(chatHttp);
const { expect } = chai;

afterEach('Clean database', function(){
  Object.values(db.sequelize.models).map(function(model) {
    return model.destroy({ truncate: true });
  });
});

describe('Testing the stone endpoints:', () => {
  it('It should create a stone', async () => {
    const admin = await userFactory({role: 'admin'});
    const stone = {
      title: 'First Awesome stone'
    };
    const res = await chai.request(app)
      .post('/stones')
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
      .send(stone)
      expect(res.status).to.equal(201);
      expect(res.body.data).to.include({
        title: stone.title
      });
  });

  it('It should not create a stone with empty title', async () => {
    const admin = await userFactory({role: 'admin'});
    const stone = {
      title: ''
    };
    const res = await chai.request(app)
      .post('/stones')
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
      .send(stone);
    expect(res.status).to.equal(400);
  });

  it('It should get all stones', async () => {
    const stone = await stoneFactory();
    const res = await chai.request(app)
      .get('/stones')
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data[0]['title']).to.equal(stone.title);
  });

  it('It should get a particular stone', async () => {
    const stone = await stoneFactory();
    const res = await chai.request(app)
      .get(`/stones/${stone.id}`)
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data.title).to.equal(stone.title)
  });

  it('It should not get a particular stone with invalid id', (done) => {
    const stoneId = 8888;
    chai.request(app)
      .get(`/stones/${stoneId}`)
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
      .get(`/stones/${stoneId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a stone', async () => {
    const admin = await userFactory({role: 'admin'});
    const stone = await stoneFactory();
    const updatedStone = {
      id: stone.id,
      title: 'Updated Awesome stone'
    };
    const res = await chai.request(app)
      .put(`/stones/${stone.id}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
      .send(updatedStone);
    expect(res.status).to.equal(200);
    expect(res.body.data.id).equal(updatedStone.id);
    expect(res.body.data.title).equal(updatedStone.title);
  });


  it('It should delete a stone', async () => {
    const admin = await userFactory({role: 'admin'});
    const stone = await stoneFactory();
    const res = await chai.request(app)
      .delete(`/stones/${stone.id}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token});
    expect(res.status).to.equal(200);
    expect(res.body.data).to.include({});
  });

  it('It should not delete a stone with invalid id', async () => {
    const admin = await userFactory({role: 'admin'});
    const stoneId = 777;
    const res = await chai.request(app)
      .delete(`/stones/${stoneId}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token});
    expect(res.status).to.equal(404);
    res.body.should.have.property('message')
        .eql(`Stone with the id ${stoneId} cannot be found`);
  });
});