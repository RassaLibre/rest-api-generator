var assert = require("assert"); // node.js core module
var config = require('../config/config');

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4)); // 4 is not present in this array so indexOf returns -1
    })
  })
});

describe('config', function(){
  it('should return an object with configuration', function(){
    var config_type = typeof config;
    assert.equal('object',config_type);
  });
});