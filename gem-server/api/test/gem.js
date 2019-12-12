import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';
import gemFactory from './factories/gem';
import db from "../server/src/models";
import categoryFactory from "./factories/category";
import gemCategoryFactory from "./factories/gemCategory";

chai.use(chatHttp);
const { expect } = chai;

beforeEach('Clean database', function(){
  Object.values(db.sequelize.models).map(function(model) {
    return model.destroy({ truncate: true });
  });
});

describe('Testing the gem endpoints:', () => {


  async function createGemWithAssociatedModels() {
    const gemData = {};

    gemData.category = await categoryFactory();
    gemData.gem = await gemFactory({categoryIds: [gemData.category.id]});
    await gemCategoryFactory({categoryId: [gemData.category.id], gemId: gemData.gem.id});
    return gemData;
  }


  it('It should create a gem', async () => {
    const category = await categoryFactory();

    const gem = {
      title: 'First Awesome gem',
      price: 100,
      weight: 10,
      description: 'Nice gem',
      image: 'gem.png',
      categoryIds: [category.id]
    };
    const res = await chai.request(app)
      .post('/api/v1/gems')
      .set('Accept', 'application/json')
      .send(gem);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.include({
      title: gem.title
    });
  });


  it('It should not create a gem if title is not provided', async () => {
    const category = await categoryFactory();
    const gem = {
      title: '',
      price: 100,
      weight: 10,
      description: 'Nice gem',
      image: 'gem.png',
      categoryIds: [category.id]
    };
    const res = await chai.request(app)
      .post('/api/v1/gems')
      .set('Accept', 'application/json')
      .send(gem);
    expect(res.status).to.equal(400);
  });


  it('It should not create a gem if price is not provided', async () => {
    const category = await categoryFactory();
    const gem = {
      title: 'First Awesome gem',
      weight: 10,
      description: 'Nice gem',
      image: 'gem.png',
      categoryIds: [category.id]
    };
    const res = await chai.request(app)
      .post('/api/v1/gems')
      .set('Accept', 'application/json')
      .send(gem);
    expect(res.status).to.equal(400);
  });


  // it('It should not create a gem if category is not provided', async () => {
  //   const gem = {
  //     title: 'First Awesome gem',
  //     price: 100,
  //     weight: 10,
  //     description: 'Nice gem',
  //     image: 'gem.png',
  //     categoryIds: []
  //   };
  //   const res = await chai.request(app)
  //     .post('/api/v1/gems')
  //     .set('Accept', 'application/json')
  //     .send(gem);
  //   expect(res.status).to.equal(400);
  // });


  it('It should not create a gem if nonexistent category is  provided', async () => {
    const gem = {
      title: 'First Awesome gem',
      price: 100,
      weight: 10,
      description: 'Nice gem',
      image: 'gem.png',
      categoryIds: [9999]
    };

    const res = await chai.request(app)
      .post('/api/v1/gems')
      .set('Accept', 'application/json')
      .send(gem);
    expect(res.status).to.equal(400);
  });


  it('It should get all gems with all data included categories', async () => {
    const gemData = await createGemWithAssociatedModels();

    const res = await chai.request(app)
      .get('/api/v1/gems')
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data[0]['title']).to.equal(gemData.gem.title);
    expect(res.body.data[0].categories[0].id).to.equal(gemData.category.id);
  });


  it('It should get a particular gem', async () => {
    const gemData = await createGemWithAssociatedModels();

    const res = await chai.request(app)
      .get(`/api/v1/gems/${gemData.gem.id}`)
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data.title).to.equal(gemData.gem.title)
    expect(res.body.data.categories[0].id).to.equal(gemData.category.id)
  });

  it('It should not get a particular gem with invalid id', (done) => {
    const gemId = 8888;

    chai.request(app)
      .get(`/api/v1/gems/${gemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
          .eql(`Cannot find gem with the id ${gemId}`);
        done();
      });
  });

  it('It should not get a particular gem with non-numeric id', (done) => {
    const gemId = 'aaa';

    chai.request(app)
      .get(`/api/v1/gems/${gemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a gem', async () => {
    const gemData = await createGemWithAssociatedModels();
    const updatedGem = {
      id: gemData.gem.id,
      title: 'Updated Awesome gem'
    };

    const res = await chai.request(app)
      .put(`/api/v1/gems/${gemData.gem.id}`)
      .set('Accept', 'application/json')
      .send(updatedGem);
    expect(res.status).to.equal(200);
    expect(res.body.data.id).equal(updatedGem.id);
    expect(res.body.data.title).equal(updatedGem.title);
  });


  it('It should delete a gem and corresponding intermediate objects (GemCategories)', async () => {
    const gemData = await createGemWithAssociatedModels();

    const resToDelete = await chai.request(app)
      .delete(`/api/v1/gems/${gemData.gem.id}`)
      .set('Accept', 'application/json');
    expect(resToDelete.status).to.equal(200);

    const resToGetGem = await chai.request(app)
      .get(`/api/v1/gems/${gemData.gem.id}`)
      .set('Accept', 'application/json');
    expect(resToGetGem.status).to.equal(404);

    const resToGetCategory = await chai.request(app)
      .get(`/api/v1/categories/${gemData.category.id}`)
      .set('Accept', 'application/json');
    expect(resToGetCategory.body.data.gems).to.be.empty;
  });

  it('It should not delete a gem with invalid id', (done) => {
    const gemId = 777;

    chai.request(app)
      .delete(`/api/v1/gems/${gemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
          .eql(`Gem with the id ${gemId} cannot be found`);
        done();
      });
  });

});