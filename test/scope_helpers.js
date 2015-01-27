var assert = require("assert"); // node.js core module
var example_data = require('./example_data');
var scope_helpers = require('../app/scope_helpers');

describe('Scope Helpers', function(){

  it('should be defined', function(){
    assert.equal(typeof scope_helpers, "object");
  });

  describe('Model by Name (get_model_by_name)', function(){

    var get_model_by_name;

    beforeEach(function(){
      get_model_by_name = scope_helpers['get_model_by_name'];
    });

    it('should be defined', function(){
      assert.equal(typeof get_model_by_name, "function");
    });

    it('should return the right model', function(){
      var found_model = get_model_by_name(example_data.models, "Part");
      assert.equal(found_model.name, "Part");
    });

    it('should return null if the model is not found', function(){
      var found_model = get_model_by_name(example_data.models, "Nonexisting");
      assert.equal(found_model, null);
    });

  });

});