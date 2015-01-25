var assert = require("assert"); // node.js core module
var Scope = require('../app/scope');
var example_data = require('./example_data');
var _ = require('underscore');

describe('Scope', function(){

  var scope;

  beforeEach(function(){
    scope = new Scope(example_data);
  });

  it('should be defined', function(){
    assert.equal(typeof scope, "object");
  });

  it('should register new scope variable', function(){
    var res = scope.register_scope_variable('new_one','Tomas');
    assert.equal(res, true);
    assert.equal(scope.scope_variables_['new_one'], "Tomas");
  });

  it('should register an array as scope variables', function(){
    var arr = [];
    arr["tomas"] = "guitar";
    arr["table"] = "chair";
    scope.register_scope_array(arr);
    assert.equal(scope.scope_variables_['tomas'], "guitar");
    assert.equal(scope.scope_variables_['table'], "chair");
  });

  it('should not allow to register property named "model" to scope', function(){
    var res = scope.register_scope_variable('model','Tomas');
    assert.equal(res, false);
    assert.equal(scope.scope_variables_['model'], undefined);
  });

  it('should not allow to register already existing property', function(){
    var res = scope.register_scope_variable('new_one','Tomas');
    assert.equal(res, true);
    res = scope.register_scope_variable('new_one','Tomas');
    assert.equal(res, false);  
  });

  it('should return the complete scope', function(){
    scope.register_scope_variable('first','Tomas');
    scope.register_scope_variable('second','Tore');
    scope.register_scope_variable('third','Tor-Inge');
    scope.register_scope_variable('fourth','Bernt');
    var returned_scope = scope.get_scope();
    assert.equal(typeof returned_scope, "object");
    assert.equal(_.keys(returned_scope).length, 5);
    assert.equal(_.isUndefined(returned_scope.model), false);
    assert.equal(returned_scope.first, "Tomas");
    assert.equal(returned_scope.second, "Tore");
    assert.equal(returned_scope.third, "Tor-Inge");
    assert.equal(returned_scope.fourth, "Bernt");  
  });


});