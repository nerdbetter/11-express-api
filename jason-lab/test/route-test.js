const { expect } = require('chai');
const app = require('../server');
const request = require('supertest')(app);

describe('ROUTES', function (){
  it('should return status 200', function (done){
    request.get('/')
      .expect(200)
      .expect('content-type', 'text/plain; charset=utf-8')
      .end(done);
  });
  it('should include cors header', function (done){
    request
      .get('/404')
      .expect('Acess-Control-Allow-Headers', '*')
      .expect('Acess-Control-Allow-Headers', '*')
      .end(done);
  });
  it('should handle 404', function (done){
    request
      .get('/404')
      .expect(404)
      .end(done);
  });
});

describe('All /api/chat', function() {
  var chatUser = null;
  describe('POST /api/chat', function() {
    it('should save body', function (done) {
      request.post('/api/chat')
        .send({ nickName: 'Robert Baratheon', fullName: 'Jason Logan' })
        .expect(200)
        .expect(res => {
          expect(res.body.nickName).to.equal('Robert Baratheon');
          expect(res.body.fullName).to.equal('Jason Logan');
          expect(res.body.id).to.not.be.empty;
          chatUser = res.body;
        })
        .end(done);
    });
    it('should return Not Found with invalid ID', function (done){
      request.get(`/api/chat?id=missing`)
        .expect(404)
        .end(done);
    });
  });
  describe('Get /api/chat', function() {
    it('should find by ID', function(done) {
      request.get(`/api/chat?id=${chatUser.id}`)
        .expect(res => {
          expect(res.body.nickName).to.equal('Robert Baratheon');
          expect(res.body.fullName).to.equal('Jason Logan');
          expect(res.body.id).to.not.be.empty;
        })
        .end(done);
    });
  });
  describe('DELETE /api/chat', function() {
    it('should delete a thing', function (done){
      request.delete(`/api/chat?id=${chatUser.id}`)
        .expect(res =>{
          expect(res.status).to.equal(204);
          expect(res.chatUser).to.equal(undefined);
        })
        .end(done);
    });
  });
});
