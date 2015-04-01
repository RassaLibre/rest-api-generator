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

    it('should return the model even with lower first letter', function(){
      var found_model = get_model_by_name(example_data.models, "location");
      assert.equal(found_model.name, "Location");
    });

    it('should return the model even with plural', function(){
      var found_model = get_model_by_name(example_data.models, "Parts");
      assert.equal(found_model.name, "Part");
    });

    it('should return the model even with lower first letter and plural', function(){
      var found_model = get_model_by_name(example_data.models, "locations");
      assert.equal(found_model.name, "Location");
    });

  });

  describe('Is Singular (is_singular_resource)',function(){

    var is_singular;

    beforeEach(function(){
      is_singular = scope_helpers['is_singular_resource'];
    });

    it('should be defined', function(){
      assert.equal(typeof is_singular, "function");
    });

    it('should return true', function(){
      assert.equal(is_singular("ovens/:id","GET"), true);
      assert.equal(is_singular("ovens/:id","PUT"), true);
      assert.equal(is_singular("ovens","POST"), true);
      assert.equal(is_singular("ovens/:id","DELETE"), true);
    });

    it('should return false', function(){
      assert.equal(is_singular("ovens","GET"), false);
      assert.equal(is_singular("ovens","DELETE"), false);
      assert.equal(is_singular("ovens/:id","POST"), false);
      assert.equal(is_singular("ovens","PUT"), false);
    });

  });

  describe('Get Controller Name (get_controller_name)',function(){

    var get_controller_name;

    beforeEach(function(){
      get_controller_name = scope_helpers['get_controller_name'];
    });

    it('should be defined', function(){
      assert.equal(typeof get_controller_name, "function");
    });

    it('should return the correct name', function(){
      assert.equal(get_controller_name("ovens/:id/parts","GET",":23"), "get_parts_in_ovens_23");
      assert.equal(get_controller_name("ovens/:id/parts/:part_id","GET",":23"), "get_parts_in_ovens_23");
      assert.equal(get_controller_name("ovens/:id","GET",":23"), "get_ovens_23");
      assert.equal(get_controller_name("ovens","GET",":23"), "get_ovens_23");
    });

    it('should accept URLs with slash as a first character', function(){
      assert.equal(get_controller_name("/ovens/:id/parts","GET",":23"), "get_parts_in_ovens_23");
    });

  });

  describe('Get latest param', function(){

    var get_latest_param_name;

    beforeEach(function(){
      get_latest_param_name = scope_helpers['get_latest_param_name'];
    });

    //get_latest_param_name
    it('should return the latest parameter name', function(){
      assert.equal(get_latest_param_name("ovens/:id/parts"), "parts");
      assert.equal(get_latest_param_name("ovens/:id/parts/:parts_id"), "parts");
      assert.equal(get_latest_param_name("ovens/:id"), "ovens");
      assert.equal(get_latest_param_name("ovens/"), "ovens");
    });

  });

  describe('Find URL param in properties', function(){

    var is_valid_prop_name;

    beforeEach(function(){
      is_valid_prop_name = scope_helpers['is_valid_prop_name'];
    });

    it('should find the string in the properties', function(){
      assert.equal(is_valid_prop_name(example_data.models[0].properties, "status"), true);
      assert.equal(is_valid_prop_name(example_data.models[0].properties, "tomas"), false);
    });

  });

  describe('Get natural language for endpoint', function(){

    var get_natural_language_for_endpoint;

    beforeEach(function(){
      get_natural_language_for_endpoint = scope_helpers['get_natural_language_for_endpoint'];
    });

    it('should get the correct natural language for endpoint',function(){
      var endpoint = {"id": ":33","type": "GET","url": "ovens/"};
      assert.equal(get_natural_language_for_endpoint(endpoint), 'get ovens');
      endpoint.url = 'ovens/:id'
      assert.equal(get_natural_language_for_endpoint(endpoint), 'get oven');
      endpoint.url = 'ovens/:id/parts'
      assert.equal(get_natural_language_for_endpoint(endpoint), 'get parts from oven');
      endpoint.url = 'ovens/:id/parts/:parts_id'
      assert.equal(get_natural_language_for_endpoint(endpoint), 'get part from oven');
    });

  });

});
