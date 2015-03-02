var _ = require('underscore');

/**
* the prototype is responsible for validating the config file for
* templates
*/
var Template_Config_Validator = function(){};

/**
* The function validates the passed data according to the config file rules
* @param {Object} config
* @return {Boolean} valid?
*/
Template_Config_Validator.prototype.validate = function(config){
  if(!_.isUndefined(config.name)){  //if the name is defined, check that it is a string
    if(!_.isString(config.name)) return false;
  }
  if(!_.isUndefined(config.description)){ //if the description is defined, check that it is a string
    if(!_.isString(config.description)) return false;
  }
  if(!_.isObject(config.templates)) return false;
  if(!_.isArray(config.templates.atomic)) return false;
  if(!_.isArray(config.templates.normal)) return false;
  if(!_.isArray(config.templates.duplicated)) return false;
  if(!this.validate_normal_templates_(config.templates.normal)) return false;
  if(!this.validate_atomic_templates_(config.templates.atomic)) return false;
  if(!this.validate_duplicated_templates_(config.templates.duplicated)) return false;
  return true;
};

/**
* The function validates normal templates
* @param {Array} normal_templates
* @return {Boolean} valid?
*/
Template_Config_Validator.prototype.validate_normal_templates_ = function(normal_templates){
  for(var i = 0; i < normal_templates.length; i++){
    if(!_.isString(normal_templates[i].path)) return false; //check that the path is string
    if(!_.isUndefined(normal_templates[i].destination)){ //check that the destination is string
      if(!_.isString(normal_templates[i].destination)) return false;
      if(normal_templates[i].destination.slice(-1) !== "/") return false;
    }
  }
  return true;
};

/**
* The function validates the atomic templates
* @param {Array} atomic_templates
* @return {Boolean} valid?
*/
Template_Config_Validator.prototype.validate_atomic_templates_ = function(atomic_templates){
  for(var i = 0; i < atomic_templates.length; i++){
    if(!_.isString(atomic_templates[i].path)) return false; //check that the path is string
  }
  return true;
};

/**
* The function validates the duplicated templates
* @param {Array} duplicated_templates
* @return {Boolean} valid?
*/
Template_Config_Validator.prototype.validate_duplicated_templates_ = function(duplicated_templates){
  for(var i = 0; i < duplicated_templates.length; i++){
    if(!_.isString(duplicated_templates[i].path)) return false; //check that the path is string
    if(!_.isUndefined(duplicated_templates[i].destination)){ //check that the destination is string
      if(!_.isString(duplicated_templates[i].destination)) return false;
      if(duplicated_templates[i].destination.slice(-1) !== "/") return false;
    }
    if(!_.isString(duplicated_templates[i].scope)) return false; //check that the path is string
    if(!_.isString(duplicated_templates[i].reference)) return false; //check that the path is string
    if(!_.isString(duplicated_templates[i].name_property)) return false; //check that the path is string
  }
  return true;
};

/**
* export the module
*/
module.exports = Template_Config_Validator;
