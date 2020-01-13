import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';
import coatingFactory from './factories/coating';
import db from "../server/src/models";
import userFactory from "./factories/user";

chai.use(chatHttp);
const { expect } = chai;

afterEach('Clean database', function(){
  Object.values(db.sequelize.models).map(function(model) {
    return model.destroy({ truncate: true });
  });
});

describe('Testing the coating endpoints:', () => {
  it('It should create a coating', async () => {
    const admin = await userFactory({role: 'admin'});
    const coating = {
      title: 'First Awesome coating'
    };
    const res = await chai.request(app)
      .post('/api/v1/coatings')
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
      .send(coating);
      expect(res.status).to.equal(201);
      expect(res.body.data).to.include({
        title: coating.title
      });
  });

  it('It should not create a coating with empty title', async () => {
    const admin = await userFactory({role: 'admin'});
    const coating = {
      title: ''
    };
    const res = await chai.request(app)
      .post('/api/v1/coatings')
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
      .send(coating)
    expect(res.status).to.equal(400);
  });

  it('It should get all coatings', async () => {
    const coating = await coatingFactory();
    const res = await chai.request(app)
      .get('/api/v1/coatings')
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data[0]['title']).to.equal(coating.title);
  });

  it('It should get a particular coating', async () => {
    const coating = await coatingFactory();
    const res = await chai.request(app)
      .get(`/api/v1/coatings/${coating.id}`)
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data.title).to.equal(coating.title)
  });

  it('It should not get a particular coating with invalid id', (done) => {
    const coatingId = 8888;
    chai.request(app)
      .get(`/api/v1/coatings/${coatingId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
          .eql(`Cannot find coating with the id ${coatingId}`);
        done();
      });
  });

  it('It should not get a particular coating with non-numeric id', (done) => {
    const coatingId = 'aaa';
    chai.request(app)
      .get(`/api/v1/coatings/${coatingId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a coating', async () => {
    const admin = await userFactory({role: 'admin'});
    const coating = await coatingFactory();
    const updatedCoating = {
      id: coating.id,
      title: 'Updated Awesome coating'
    };
    const res = await chai.request(app)
      .put(`/api/v1/coatings/${coating.id}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
      .send(updatedCoating)
    expect(res.status).to.equal(200);
    expect(res.body.data.id).equal(updatedCoating.id);
    expect(res.body.data.title).equal(updatedCoating.title);
  });


  it('It should delete a coating', async () => {
    const admin = await userFactory({role: 'admin'});
    const coating = await coatingFactory();
    const res = await chai.request(app)
      .delete(`/api/v1/coatings/${coating.id}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
    expect(res.status).to.equal(200);
    expect(res.body.data).to.include({});
  });

  it('It should not delete a coating with invalid id', async () => {
    const admin = await userFactory({role: 'admin'});
    const coatingId = 777;
    const res = await chai.request(app)
      .delete(`/api/v1/coatings/${coatingId}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
      expect(res.status).to.equal(404);
      res.body.should.have.property('message')
        .eql(`Coating with the id ${coatingId} cannot be found`);
  });
});