var _ = require('underscore');


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
* function returns complete scope ready to be used in the templates
* @return {Object}
*/
scope.prototype.get_scope = function(){
  var scope = {};
  scope.model = this.model;
  return _.extend(scope, this.scope_variables_);
};

module.exports = scope;