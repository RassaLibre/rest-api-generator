var assert = require("assert"); // node.js core module
var db_query_builder = require('../app/db_query_builder');

describe('Query Builder', function(){

  var model_fields = {
    name : {type: "string", regex: /^[A-Za-z0-9]+$/i, length: 30},
    value : {type: "integer", min: 0, max: 40},
    price : {type: "integer", min: 0},
    count : {type : "integer", min: 0},
    SKU : {type : "string"},
    createdAt: {type: "timestamp"},
    updatedAt: {type: "timestamp"}
  };

  it('should be defined', function(){
    assert.equal(typeof db_query_builder, "object");
  });

  it('should return empty query and orderby', function(){
    assert.deepEqual(db_query_builder.build_db_query({}, model_fields),
      {$query: {}, $orderby: {}});
  });

  it('should recognize that the filter is number and parse it as number',function(){
      var query_string = db_query_builder.build_db_query({count: 29}, model_fields);
      assert.equal(typeof query_string.$query.count, 'number');
  });

  it('should filter strings as regexes', function(){
    var query_string = db_query_builder.build_db_query({name: "Tomas"}, model_fields);
    assert.equal(typeof query_string.$query.name, 'object');
    assert.deepEqual(typeof query_string.$query.name.$regex, 'object');
  });

  it('should recognize in which direction to filter dates', function(){
    var query_string = db_query_builder.build_db_query({createdAt: ">807979679"}, model_fields);
    assert.equal(query_string.$query.createdAt.$gt, 807979679);
    var query_string = db_query_builder.build_db_query({createdAt: "<807979679"}, model_fields);
    assert.equal(query_string.$query.createdAt.$lt, 807979679);
  });

  it('should recognize the orderBy param and set it correctly', function(){
    var query_string = db_query_builder.build_db_query({orderBy: 'SKU'}, model_fields);
    assert.equal(typeof query_string.$orderby.SKU, 'number');
  });

  it('should set the ordering direction correctly', function(){
    var query_string = db_query_builder.build_db_query({orderBy: 'SKU'}, model_fields);
    assert.equal(query_string.$orderby.SKU, 1);
    var query_string = db_query_builder.build_db_query({orderBy: 'SKU', orderDirection: 'desc'}, model_fields);
    assert.equal(query_string.$orderby.SKU, -1);
  });

});
