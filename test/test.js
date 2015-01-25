var assert = require("assert"); // node.js core module
var config = require('../config/config');

describe('config', function(){
  it('should return an object with configuration', function(){
    var config_type = typeof config;
    assert.equal('object',config_type);
  });
});