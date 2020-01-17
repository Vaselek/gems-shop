import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';
import metalFactory from './factories/metal';
import db from "../server/src/models";
import userFactory from "./factories/user";

chai.use(chatHttp);
const { expect } = chai;

afterEach('Clean database', function(){
  Object.values(db.sequelize.models).map(function(model) {
    return model.destroy({ truncate: true });
  });
});

describe('Testing the metal endpoints:', () => {
  it('It should create a metal', async () => {
    const admin = await userFactory({role: 'admin'});
    const metal = {
      title: 'First Awesome metal'
    };
    const res = await chai.request(app)
      .post('/metals')
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
      .send(metal)
      expect(res.status).to.equal(201);
      expect(res.body.data).to.include({
        title: metal.title
      });
  });

  it('It should not create a metal with empty title', async () => {
    const admin = await userFactory({role: 'admin'});
    const metal = {
      title: ''
    };
    const res = await chai.request(app)
      .post('/metals')
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
      .send(metal)
    expect(res.status).to.equal(400);
  });

  it('It should get all metals', async () => {
    const metal = await metalFactory();
    const res = await chai.request(app)
      .get('/metals')
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data[0]['title']).to.equal(metal.title);
  });

  it('It should get a particular metal', async () => {
    const metal = await metalFactory();
    const res = await chai.request(app)
      .get(`/metals/${metal.id}`)
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data.title).to.equal(metal.title)
  });

  it('It should not get a particular metal with invalid id', (done) => {
    const metalId = 8888;
    chai.request(app)
      .get(`/metals/${metalId}`)
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
      .get(`/metals/${metalId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a metal', async () => {
    const admin = await userFactory({role: 'admin'});
    const metal = await metalFactory();
    const updatedMetal = {
      id: metal.id,
      title: 'Updated Awesome metal'
    };
    const res = await chai.request(app)
      .put(`/metals/${metal.id}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
      .send(updatedMetal)
    expect(res.status).to.equal(200);
    expect(res.body.data.id).equal(updatedMetal.id);
    expect(res.body.data.title).equal(updatedMetal.title);
  });


  it('It should delete a metal', async () => {
    const admin = await userFactory({role: 'admin'});
    const metal = await metalFactory();
    const res = await chai.request(app)
      .delete(`/metals/${metal.id}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token});
    expect(res.status).to.equal(200);
    expect(res.body.data).to.include({});
  });

  it('It should not delete a metal with invalid id', async () => {
    const admin = await userFactory({role: 'admin'});
    const metalId = 777;
    const res = await  chai.request(app)
      .delete(`/metals/${metalId}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token});
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
          .eql(`Metal with the id ${metalId} cannot be found`);
  });
});