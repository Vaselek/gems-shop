import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';
import metalFactory from './factories/metal';
import db from "../server/src/models";

chai.use(chatHttp);
const { expect } = chai;

afterEach('Clean database', function(){
  Object.values(db.sequelize.models).map(function(model) {
    return model.destroy({ truncate: true });
  });
});

describe('Testing the metal endpoints:', () => {
  it('It should create a metal', (done) => {
    const metal = {
      title: 'First Awesome metal'
    };
    chai.request(app)
      .post('/api/v1/metals')
      .set('Accept', 'application/json')
      .send(metal)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          title: metal.title
        });
        done();
      });
  });

  it('It should not create a metal with empty title', (done) => {
    const metal = {
      title: ''
    };
    chai.request(app)
      .post('/api/v1/metals')
      .set('Accept', 'application/json')
      .send(metal)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('It should get all metals', async () => {
    const metal = await metalFactory();
    const res = await chai.request(app)
      .get('/api/v1/metals')
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data[0]['title']).to.equal(metal.title);
  });

  it('It should get a particular metal', async () => {
    const metal = await metalFactory();
    const res = await chai.request(app)
      .get(`/api/v1/metals/${metal.id}`)
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data.title).to.equal(metal.title)
  });

  it('It should not get a particular metal with invalid id', (done) => {
    const metalId = 8888;
    chai.request(app)
      .get(`/api/v1/metals/${metalId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
          .eql(`Cannot find metal with the id ${metalId}`);
        done();
      });
  });

  it('It should not get a particular metal with non-numeric id', (done) => {
    const metalId = 'aaa';
    chai.request(app)
      .get(`/api/v1/metals/${metalId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a metal', async () => {
    const metal = await metalFactory();
    const updatedMetal = {
      id: metal.id,
      title: 'Updated Awesome metal'
    };
    const res = await chai.request(app)
      .put(`/api/v1/metals/${metal.id}`)
      .set('Accept', 'application/json')
      .send(updatedMetal)
    expect(res.status).to.equal(200);
    expect(res.body.data.id).equal(updatedMetal.id);
    expect(res.body.data.title).equal(updatedMetal.title);
  });


  it('It should delete a metal', async () => {
    const metal = await metalFactory();
    const res = await chai.request(app)
      .delete(`/api/v1/metals/${metal.id}`)
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data).to.include({});
  });

  it('It should not delete a metal with invalid id', (done) => {
    const metalId = 777;
    chai.request(app)
      .delete(`/api/v1/metals/${metalId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
          .eql(`Metal with the id ${metalId} cannot be found`);
        done();
      });
  });
});