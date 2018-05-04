const chai = require('chai');
const should = chai.should();
const server = require('../server');
const chaiHttp = require('chai-http');
const {app, database} = require('../server.js');

chai.use(chaiHttp);

describe("hello", () => {
  it("goodie", () => {

  });
});
