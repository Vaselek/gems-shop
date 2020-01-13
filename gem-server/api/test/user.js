import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';
import userFactory from './factories/user';
import db from "../server/src/models";
import {createGemWithAssociatedModels} from "./utils";
import faker from "faker";

chai.use(chatHttp);
const { expect } = chai;

afterEach('Clean database', function(){
  Object.values(db.sequelize.models).map(function(model) {
    return model.destroy({ truncate: true });
  });
});

describe('Testing the user endpoints:', () => {
  it('It should create a user', async () => {
    const user = {
      email: faker.internet.email(),
      username: faker.name.findName(),
      password: faker.lorem.word(),
      role: 'user',
      token: faker.lorem.word()
    };
    const res = await chai.request(app)
      .post('/api/v1/users')
      .set({'Accept': 'application/json'})
      .send(user);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.include({
      email: user.email
    });
  });

  it('It should not create a user with lack of details', async () => {
    const user = {
      email: ''
    };
    const res = await chai.request(app)
      .post('/api/v1/users')
      .set({'Accept': 'application/json'})
      .send(user);
    expect(res.status).to.equal(400);
  });

  it('It should get all users', async () => {
    const admin = await userFactory({role: 'admin'});
    const res = await chai.request(app)
      .get('/api/v1/users')
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
    expect(res.status).to.equal(200);
    expect(res.body.data[0]['email']).to.equal(admin.email);
  });

  it('It should not get a particular user with invalid id', async () => {
    const admin = await userFactory({role: 'admin'});
    const userId = 8888;
    const res = await chai.request(app)
      .get(`/api/v1/users/${userId}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token});
    expect(res.status).to.equal(404);
    res.body.should.have.property('message')
      .eql(`User with the id ${userId} cannot be found`);
  });

  it('It should not get a particular user with non-numeric id', async () => {
    const admin = await userFactory({role: 'admin'});
    const userId = 'aaa';
    const res = await chai.request(app)
      .get(`/api/v1/users/${userId}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
    expect(res.status).to.equal(400);
    res.body.should.have.property('message')
      .eql('Please input a valid numeric value');
  });

  it('It should update a user', async () => {
    const user = await userFactory();
    const updatedUser = {
      email: 'updated@email.com'
    };
    const res = await chai.request(app)
      .put(`/api/v1/users/${user.id}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + user.token})
      .send(updatedUser);
    expect(res.status).to.equal(200);
    expect(res.body.data.id).equal(updatedUser.id);
    expect(res.body.data.title).equal(updatedUser.title);
  });

  it('It should let admin to update a user', async () => {
    const admin = await userFactory({role: 'admin'});
    const user = await userFactory();
    const updatedUser = {
      email: 'updated@email.com'
    };
    const res = await chai.request(app)
      .put(`/api/v1/users/admin/${user.id}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
      .send(updatedUser);
    expect(res.status).to.equal(200);
    expect(res.body.data.id).equal(updatedUser.id);
    expect(res.body.data.title).equal(updatedUser.title);
  });


  it('It should delete a user', async () => {
    const admin = await userFactory({role: 'admin'});
    const user = await userFactory();
    const res = await chai.request(app)
      .delete(`/api/v1/users/${user.id}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
    expect(res.status).to.equal(200);
    expect(res.body.data).to.include({});
  });

  it('It should not delete a user with invalid id', async () => {
    const admin = await userFactory({role: 'admin'});
    const userId = 777;
    const res = await chai.request(app)
      .delete(`/api/v1/users/${userId}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
    expect(res.status).to.equal(404);
    res.body.should.have.property('message')
      .eql(`User with the id ${userId} cannot be found`);
  });
});