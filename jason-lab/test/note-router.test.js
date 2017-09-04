const app = require('../server');
const { expect } = require('chai');
const User = require('../model/user.js');
const request = require('supertest')(app);

describe('/api/chat routes', function(){
  const exampleUser = new User('NerdBetter', 'Jason Logan');
  beforeEach(function(done){
    User.createUser(exampleUser)
      .then(user => {
        this.putUser = user;
        done();
      })
      .catch(done);
  });
  afterEach(function(done){
    if (this.putUser){
      User.deleteUser(this.putUser.id)
        .then(user => {
          this.putUser = user;
          done();
        })
        .catch(done);
    }
  });
  describe('POST', function(){
    it('should return 200 with JSON of User', function(done){
      request
        .post('/api/chat')
        .send(exampleUser)
        .expect(200)
        .expect( res => {
          console.log(res.body);
          expect(res.body.nickName).to.equal(exampleUser.nickName);
          expect(res.body.fullName).to.equal(exampleUser.fullName);
        })
        .end(done);
    });
  });
  describe('PUT', function(){
    it('should update a note by id', function(done){
      request
        .put(`/api/chat?id=${this.putUser.id}`)
        .send({nickName:'updated'})
        .expect(200)
        .expect(res=>{
          expect(res.body.id).to.equal(this.putUser.id);
          expect(res.body.nickName).to.equal('updated');
        })
        .end(done);
    });
  });
  describe('Get /api/chat', function() {
    it('should find by ID', function(done) {
      request
        .get(`/api/chat?id=${this.putUser.id}`)
        .expect(res => {
          expect(res.body.nickName).to.equal('NerdBetter');
          expect(res.body.fullName).to.equal('Jason Logan');
          expect(res.body.id).to.not.be.empty;
        })
        .end(done);
    });
  });
});
