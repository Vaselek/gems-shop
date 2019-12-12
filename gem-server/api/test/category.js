import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';
import categoryFactory from './factories/category';
import db from "../server/src/models";

chai.use(chatHttp);
const { expect } = chai;

afterEach('Clean database', function(){
  Object.values(db.sequelize.models).map(function(model) {
    return model.destroy({ truncate: true });
  });
});

describe('Testing the category endpoints:', () => {
  it('It should create a category', (done) => {
    const category = {
      title: 'First Awesome category'
    };
    chai.request(app)
      .post('/api/v1/categories')
      .set('Accept', 'application/json')
      .send(category)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          title: category.title
        });
        done();
      });
  });

  it('It should not create a category with empty title', (done) => {
    const category = {
      title: ''
    };
    chai.request(app)
      .post('/api/v1/categories')
      .set('Accept', 'application/json')
      .send(category)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('It should get all categories', async () => {
    const category = await categoryFactory();
    const res = await chai.request(app)
      .get('/api/v1/categories')
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data[0]['title']).to.equal(category.title);
  });

  it('It should get a particular category with associated gems', async () => {
    const category = await categoryFactory();

    const gem = {
      title: 'First Awesome gem',
      price: 100,
      weight: 10,
      description: 'Nice gem',
      image: 'gem.png',
      categoryIds: [category.id]
    };
    await chai.request(app)
      .post('/api/v1/gems')
      .set('Accept', 'application/json')
      .send(gem);

    const res = await chai.request(app)
      .get(`/api/v1/categories/${category.id}`)
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data.title).to.equal(category.title);
    expect(res.body.data.gems[0].title).to.equal(gem.title);
  });

  it('It should not get a particular category with invalid id', (done) => {
    const categoryId = 8888;
    chai.request(app)
      .get(`/api/v1/categories/${categoryId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
          .eql(`Cannot find category with the id ${categoryId}`);
        done();
      });
  });

  it('It should not get a particular category with non-numeric id', (done) => {
    const categoryId = 'aaa';
    chai.request(app)
      .get(`/api/v1/categories/${categoryId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a category', async () => {
    const category = await categoryFactory();
    const updatedCategory = {
      id: category.id,
      title: 'Updated Awesome category'
    };
    const res = await chai.request(app)
      .put(`/api/v1/categories/${category.id}`)
      .set('Accept', 'application/json')
      .send(updatedCategory)
    expect(res.status).to.equal(200);
    expect(res.body.data.id).equal(updatedCategory.id);
    expect(res.body.data.title).equal(updatedCategory.title);
  });


  it('It should delete a category', async () => {
    const category = await categoryFactory();
    const res = await chai.request(app)
      .delete(`/api/v1/categories/${category.id}`)
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data).to.include({});
  });

  it('It should not delete a category with invalid id', (done) => {
    const categoryId = 777;
    chai.request(app)
      .delete(`/api/v1/categories/${categoryId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
          .eql(`Category with the id ${categoryId} cannot be found`);
        done();
      });
  });
});