var assert = require("assert"); // node.js core module
var Metamodel = require('../app/metamodel/metamodel');
var example_data = require('./example_data');

describe('Metamodel', function(){
  
  var metamodel;

  beforeEach(function(){
    metamodel = new Metamodel();
  });

  it('should be defined', function(){
    assert.equal(typeof metamodel, "object");
  });

  it('should evaluate the example model as valid', function(){
    assert.equal(metamodel.validate(example_data),true);
  });

  it('should check for blind associations', function(){
    metamodel.model_names_ = ["Oven", "Location"];
    var data = [{
      "id": ":32",
      "name": "positioned at",
      "model1": {
        "name": "Oven",
        "id": ":1"
      },
      "model2": {
        "name": "Parts",
        "id": ":15"
      }
    }];
    assert.equal(metamodel.validate_associations_(data), false);
    data[0].model2.name = "Location";
    assert.equal(metamodel.validate_associations_(data), true);
  });

  it('should check that integer/double property has min smaller than max',
    function(){
      var data = [{
        "id": ":25",
        "name": "price",
        "type": {
          "type": "double",
          "min": 30,
          "max" : 0
        }
      }];
      assert.equal(metamodel.validate_properties_(data), false);
      data[0].type.min = 0;
      data[0].type.max = 30;
      assert.equal(metamodel.validate_properties_(data), true);
  });

  it('should check that the array value is valid', function(){
    var data = [{
      "id": ":4",
      "name": "parts",
      "type": {
        "type": "array",
        "key": "integer",
        "value": "Part"
      }
    }];
    assert.equal(metamodel.validate_properties_(data), false);
    metamodel.model_names_ = ["Part"];
    assert.equal(metamodel.validate_properties_(data), true);    
  });

  it('should check that the http method is allowed', function(){
    var data = [{
      "id": ":33",
      "type": "TOMAS",
      "url": "ovens/"
    }];
    assert.equal(metamodel.validate_endpoints_(data), false);
    data[0].type = "GET";
    assert.equal(metamodel.validate_endpoints_(data), true);
  });



});