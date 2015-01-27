var _ = require('underscore');
var RandExp = require('randexp');
var helpers = require('../scope_helpers');
var pluralize = require('pluralize');

/**
* The prototype represents scope on which all the templates will be executed
* @constructor
* @param {Object} model created in the editor
*/
var scope = function(model){
  
  /**
  * model created in the editor
  * @type {Object}
  */
  this.model = model;

  /**
  * object stores all the additional variables that will be attached to
  * the scope
  * @type {Object}
  */
  this.scope_variables_ = {};
};

/**
* function registers new scope variables with a passed key. This key has
* to be unique.
* @param {String} key
* @param {String|Function|Object} variable
* @return {Bool} scope variable registered? 
*/
scope.prototype.register_scope_variable = function(key, variable){
  if((!_.isUndefined(this.scope_variables_[key]))||(key === "model")) return false;
  else{
    this.scope_variables_[key] = variable;
    return true;
  }
};

/**
* function takes the passed array and adds all items into the scope_variables_
* property
* @property {Array} arr
*/
scope.prototype.register_scope_array = function(arr){
  var keys = Object.keys(arr);
  for(var i = 0; i < keys.length; i++){
    this.register_scope_variable(keys[i], arr[keys[i]]);
  }
};

/**
* function returns complete scope ready to be used in the templates
* @return {Object}
*/
scope.prototype.get_scope = function(){
  var scope = {};
  scope.model = this.model;
  scope.pluralize = pluralize;  //library for making a plurals 
  this.register_scope_array(helpers);
  scope.randomizer = RandExp; //random string generator used in API blueprint
  return _.extend(scope, this.scope_variables_);
};

module.exports = scope;