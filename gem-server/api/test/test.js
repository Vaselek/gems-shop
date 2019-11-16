import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

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

  // it('It should not create a category with incomplete parameters', (done) => {
  //   const category = {
  //     price: '$9.99',
  //     description: 'This is the awesome category'
  //   };
  //   chai.request(app)
  //     .post('/api/v1/categories')
  //     .set('Accept', 'application/json')
  //     .send(category)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400);
  //       done();
  //     });
  // });

  it('It should get all categories', (done) => {
    chai.request(app)
      .get('/api/v1/categories')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('title');
        done();
      });
  });

  it('It should get a particular category', (done) => {
    const categoryId = 1;
    chai.request(app)
      .get(`/api/v1/categories/${categoryId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('title');
        done();
      });
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

  it('It should update a category', (done) => {
    const categoryId = 1;
    const updatedCategory = {
      id: categoryId,
      title: 'Updated Awesome category'
    };
    chai.request(app)
      .put(`/api/v1/categories/${categoryId}`)
      .set('Accept', 'application/json')
      .send(updatedCategory)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedCategory.id);
        expect(res.body.data.title).equal(updatedCategory.title);
        done();
      });
  });

  it('It should not update a category with invalid id', (done) => {
    const categoryId = '9999';
    const updatedCategory = {
      id: categoryId,
      title: 'Updated Awesome category again'
    };
    chai.request(app)
      .put(`/api/v1/categories/${categoryId}`)
      .set('Accept', 'application/json')
      .send(updatedCategory)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
          .eql(`Cannot find category with the id: ${categoryId}`);
        done();
      });
  });

  it('It should not update a category with non-numeric id value', (done) => {
    const categoryId = 'ggg';
    const updatedCategory = {
      id: categoryId,
      title: 'Updated Awesome category again'
    };
    chai.request(app)
      .put(`/api/v1/categories/${categoryId}`)
      .set('Accept', 'application/json')
      .send(updatedCategory)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value');
        done();
      });
  });


  it('It should delete a category', (done) => {
    const categoryId = 1;
    chai.request(app)
      .delete(`/api/v1/categories/${categoryId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
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

  it('It should not delete a category with non-numeric id', (done) => {
    const categoryId = 'bbb';
    chai.request(app)
      .delete(`/api/v1/categories/${categoryId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message').eql('Please provide a numeric value');
        done();
      });
  });
});