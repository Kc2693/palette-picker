const chai = require('chai');
const should = chai.should();
const server = require('../server');
const chaiHttp = require('chai-http');
const { app, database } = require('../server.js');

chai.use(chaiHttp);

describe("Root url requests", () => {
  it("should server static assets and return status code 200", (done) => {
    chai.request(server).get('/').end((err, response) => {
      response.should.be.html;
      response.should.have.status(200);
      done();
    });
  });

  it("should return 404 for unknown route", (done) => {
    chai.request(server).get('/spooky').end((err, response) => {
      response.should.have.status(404);
      done();
    });
  });
  // sad path test
});

describe("Projects requests", () => {
  beforeEach(function(done) {
    database.migrate.rollback()
    .then(function() {
      database.migrate.latest()
      .then(function() {
        return database.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  describe("GET", () => {
    it("should return an array and status code 200", (done) => {
      chai.request(server).get('/api/v1/projects').end((err, response) => {
        response.should.be.json;
        response.body.should.be.a('array');
        // response.body.should.have.a.lengthOf(3);
        response.should.have.status(200);
        done();
      });
    });
    // sad path GET test

  });

  describe("POST", () => {
    it("should add a project", (done) => {
      chai.request(server).post('/api/v1/projects').send({title: 'phoenix'}).end((err, response) => {
        response.should.have.status(201);
        response.should.be.json;
        // response.body.should.be.a('object');
        // response.body.should.have.property('title');
        // response.body.name.should.equal('phoenix');
        done();
      })
    });

  });
});
