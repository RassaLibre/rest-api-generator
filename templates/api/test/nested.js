var assert = require("assert"); // node.js core module
var nested = require("../app/nested")

describe('Nested functions', function(){
  
  var data = {
    "people": [
      {"id" : 1, "name" : "Tomas"},
      {"id" : 2, "name" : "Tore"}
    ]
  };

  describe('Add to nested', function(){
    it('should add a new record', function(){
      var new_record = {"id" : 3, "name" : "Tor-Inge"};
      assert.equal(data.people.length, 2);
      var result = nested.add_nested(new_record, "people", data);
      assert.equal(data.people.length, 3);
    });
  });

  describe('Get from nested', function(){
    it('should retrieve a record', function(){
      var result = nested.get_nested("id", 1, "people", data);
      assert.equal(result.id, 1);
      assert.equal(typeof result, "object");
    });
  });

  describe('remove from nested', function(){
    //because I add in the previous step one
    var data = {
      "people": [
        {"id" : 1, "name" : "Tomas"},
        {"id" : 2, "name" : "Tore"}
      ]
    };
    it('should remove a record', function(){
      assert.equal(data.people.length, 2);
      var result = nested.remove_nested(1, "people", data, "id");
      assert.equal(result.people.length, 1);
    });
  });

  describe('update nested', function(){
    it('should update the object in the nested collection', function(){
      var result = nested.update_nested({"name" : "Kjell"}, 1, "people", data, "id");
      var result2 = nested.get_nested("id", 1, "people", result);
      assert.equal(result2.name, "Kjell");
    });
  });

});