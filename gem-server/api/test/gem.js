import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';
import gemFactory from './factories/gem';
import db from "../server/src/models";
import categoryFactory from "./factories/category";
import gemCategoryFactory from "./factories/gemCategory";
import gemMetalFactory from "./factories/gemMetal";
import gemCoatingFactory from "./factories/gemCoating";
import gemStoneFactory from "./factories/gemStone";
import metalFactory from "./factories/metal";
import stoneFactory from "./factories/stone";
import coatingFactory from "./factories/coating";
import {createGemWithAssociatedModels} from "./utils";
import userFactory from "./factories/user";

chai.use(chatHttp);
const { expect } = chai;

beforeEach('Clean database', function(){
  Object.values(db.sequelize.models).map(function(model) {
    return model.destroy({ truncate: true });
  });
});

describe('Testing the gem endpoints:', () => {
  it('It should create a gem', async () => {
    const admin = await userFactory({role: 'admin'});
    const category = await categoryFactory();
    const metal =  await metalFactory();
    const stone = await stoneFactory();
    const coating = await coatingFactory();

    const gem = {
      title: 'First Awesome gem',
      price: 100,
      weight: 10,
      description: 'Nice gem',
      image: 'gem.png',
      categoryIds: [category.id],
      stoneIds: [stone.id],
      coatingIds: [coating.id],
      metalIds: [metal.id]
    };
    const res = await chai.request(app)
      .post('/gems')
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
      .send(gem);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.include({
      title: gem.title
    });
  });


  it('It should not create a gem if title is not provided', async () => {
    const admin = await userFactory({role: 'admin'});
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
      .post('/gems')
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
      .send(gem);
    expect(res.status).to.equal(400);
  });


  it('It should not create a gem if price is not provided', async () => {
    const admin = await userFactory({role: 'admin'});
    const category = await categoryFactory();
    const gem = {
      title: 'First Awesome gem',
      weight: 10,
      description: 'Nice gem',
      image: 'gem.png',
      categoryIds: [category.id]
    };
    const res = await chai.request(app)
      .post('/gems')
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
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
  //     .post('/gems')
  //     .set('Accept', 'application/json')
  //     .send(gem);
  //   expect(res.status).to.equal(400);
  // });


  it('It should not create a gem if nonexistent category is  provided', async () => {
    const admin = await userFactory({role: 'admin'});
    const gem = {
      title: 'First Awesome gem',
      price: 100,
      weight: 10,
      description: 'Nice gem',
      image: 'gem.png',
      categoryIds: [9999]
    };

    const res = await chai.request(app)
      .post('/gems')
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
      .send(gem);
    expect(res.status).to.equal(400);
  });


  it('It should get all gems with all data included categories', async () => {
    const gemData = await createGemWithAssociatedModels();

    const res = await chai.request(app)
      .get('/gems?categoryId=' + gemData.category.id)
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data[0]['title']).to.equal(gemData.gem.title);
    expect(res.body.data[0].categoryId[0]).to.equal(gemData.category.id);
    expect(res.body.data[0].metals[0]).to.equal(gemData.metal.title);
    expect(res.body.data[0].stones[0]).to.equal(gemData.stone.title);
    expect(res.body.data[0].coatings[0]).to.equal(gemData.coating.title);
  });


  it('It should get a particular gem', async () => {
    const gemData = await createGemWithAssociatedModels();

    const res = await chai.request(app)
      .get(`/gems/${gemData.gem.id}`)
      .set('Accept', 'application/json');
    expect(res.status).to.equal(200);
    expect(res.body.data.title).to.equal(gemData.gem.title)
    expect(res.body.data.categories[0].id).to.equal(gemData.category.id)
    expect(res.body.data.metals[0].id).to.equal(gemData.metal.id);
    expect(res.body.data.stones[0].id).to.equal(gemData.stone.id);
    expect(res.body.data.coatings[0].id).to.equal(gemData.coating.id);
  });

  it('It should not get a particular gem with invalid id', (done) => {
    const gemId = 8888;

    chai.request(app)
      .get(`/gems/${gemId}`)
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
      .get(`/gems/${gemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a gem', async () => {
    const admin = await userFactory({role: 'admin'});
    const gemData = await createGemWithAssociatedModels();
    const updatedGem = {
      id: gemData.gem.id,
      title: 'Updated Awesome gem'
    };

    const res = await chai.request(app)
      .put(`/gems/${gemData.gem.id}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token})
      .send(updatedGem);
    expect(res.status).to.equal(200);
    expect(res.body.data.id).equal(updatedGem.id);
    expect(res.body.data.title).equal(updatedGem.title);
  });


  it('It should delete a gem and corresponding intermediate objects (GemCategories)', async () => {
    const admin = await userFactory({role: 'admin'});
    const gemData = await createGemWithAssociatedModels();

    const resToDelete = await chai.request(app)
      .delete(`/gems/${gemData.gem.id}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token});
    expect(resToDelete.status).to.equal(200);

    const resToGetGem = await chai.request(app)
      .get(`/gems/${gemData.gem.id}`)
      .set('Accept', 'application/json');
    expect(resToGetGem.status).to.equal(404);

    const resToGetCategory = await chai.request(app)
      .get(`/categories/${gemData.category.id}`)
      .set('Accept', 'application/json');
    expect(resToGetCategory.body.data.gems).to.be.empty;
  });

  it('It should not delete a gem with invalid id', async () => {
    const admin = await userFactory({role: 'admin'});
    const gemId = 777;

    const res = await chai.request(app)
      .delete(`/gems/${gemId}`)
      .set({'Accept': 'application/json', 'Authorization': 'Bearer ' + admin.token});
    expect(res.status).to.equal(404);
    res.body.should.have.property('message')
      .eql(`Gem with the id ${gemId} cannot be found`);
  });

});