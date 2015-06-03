var _ = require('underscore');
var Abstract_Metamodel = require('./abstract_metamodel');

/**
* metamodel of the possed input. This prototype is responsible for validating
* the input model
*/
var metamodel = function(){

  /**
  * Array with model names. This is used for validating that associations
  * are between existing models.
  * @type {Array}
  * @private
  */
  this.model_names_ = [];

  /**
  * http methods allowed in the model
  * @private
  * @type {Array}
  */
  this.allowed_http_methods_ = ["GET", "POST", "PUT", "OPTION","DELETE"];

  /**
  * array contains property types which have no additional fields
  * and are not models
  * @private
  * @type {Array}
  */
  this.other_property_types_ = ["timestamp", "geojson"];

  /**
  * contains all primitive types which are allowed as a array value
  * it is needed because a validation of array value property is needed
  * @private
  * @type {Array}
  */
  this.array_value_primitive_types_ = ["integer", "string", "double"];

};

/**
* inherit the abstract metamodel
*/
metamodel.prototype = new Abstract_Metamodel();
metamodel.prototype.constructor = metamodel;

/**
* function validates the incoming data according to the standartized format
* @param {Object} data
* @return {Boolean}
*/
metamodel.prototype.validate = function(data){
  if(!_.isObject(data)) return false;
  if(!_.isArray(data.models)) return false;
  for(var i = 0; i < data.models.length; i++) this.model_names_.push(data.models[i].name);
  if(!_.isArray(data.associations)) return false;
  if(!this.validate_models_(data.models)) return false;
  if(!this.validate_associations_(data.associations)) return false;
  return true;
};

/**
* function validates models
* @param {Array} models
* @private
* @return {Boolean}
*/
metamodel.prototype.validate_models_ = function(models){
  for(var i = 0; i < models.length; i++){
    if(!_.isString(models[i].name)) return false;
    if(!_.isString(models[i].id)) return false;
    if(!_.isArray(models[i].properties)) return false;
    if(!_.isArray(models[i].endpoints)) return false;
    if(!this.validate_properties_(models[i].properties)) return false;
    if(!this.validate_endpoints_(models[i].endpoints)) return false;
  }
  return true;
};

/**
* function validates properties in models
* @param {Array} properties
* @private
* @return {Boolean}
*/
metamodel.prototype.validate_properties_ = function(properties){
  for(var i = 0; i < properties.length; i++){
    if(!_.isString(properties[i].id)) return false;
    if(!_.isString(properties[i].name)) return false;
    if(!_.isObject(properties[i].type)) return false;
    if(!_.isString(properties[i].type.type)) return false;
    //if the property is type of string, check length and regex
    if(properties[i].type.type === 'string'){
      if(!_.isUndefined(properties[i].type.length)){
        if(!_.isNumber(properties[i].type.length)) return false;
      }
      if(!_.isUndefined(properties[i].type.regex)){
        if(!_.isString(properties[i].type.regex)) return false;
        var regEx = new RegExp(properties[i].type.regex,"g");
        if(!_.isRegExp(regEx)) return false;
      }
    }
    //if the property is type of integer, check the min and max
    else if((properties[i].type.type === 'integer')||
      (properties[i].type.type === 'double')){
        if(!_.isUndefined(properties[i].type.min)){
          if(!_.isNumber(properties[i].type.min)) return false;
        }
        if(!_.isUndefined(properties[i].type.max)){
          if(!_.isNumber(properties[i].type.max)) return false;
        }
        //if both min and max are defined, check that min is smaller than max
        if((!_.isUndefined(properties[i].type.min))&&
          (!_.isUndefined(properties[i].type.max))){
            if(properties[i].type.min > properties[i].type.max) return false;
        }
    }
    //if the property is type of array, check the key and value
    else if(properties[i].type.type === 'array'){
      if(!_.isString(properties[i].type.key)) return false;
      if(!_.isString(properties[i].type.value)) return false;
      var possible_value = this.array_value_primitive_types_.concat(this.model_names_);
      if(_.indexOf(possible_value, properties[i].type.value) === -1) return false;
    }
    //otherwise just check that the type is one a model or one of the property
    //types without additional arrays
    else{
      var possible_type = this.other_property_types_.concat(this.model_names_);
      if(_.indexOf(possible_type, properties[i].type.type) === -1) return false;
    }
  }
  return true;
}

/**
* function validates the endpoints
* @param {Array} endpoints
* @private
* @return {Boolean}
*/
metamodel.prototype.validate_endpoints_ = function(endpoints){
  for(var i = 0; i < endpoints.length; i++){
    if(!_.isString(endpoints[i].id)) return false;
    if(!_.isString(endpoints[i].type)) return false;
    if(!_.isString(endpoints[i].url)) return false;
    if(endpoints[i].url.match("^\/.*")) return false; //no slash at the beginning allowed
    if(_.indexOf(this.allowed_http_methods_, endpoints[i].type) === -1)
      return false;
  }
  return true;
};

/**
* function validates the associations
* @param {Array} associations
* @private
* @return {Boolean}
*/
metamodel.prototype.validate_associations_ = function(associations){
  for(var i = 0; i < associations.length; i++){
    if(!_.isString(associations[i].id)) return false;
    if(!_.isString(associations[i].name)) return false;
    if(!_.isObject(associations[i].model1)) return false;
    if(!_.isString(associations[i].model1.id)) return false;
    if(!_.isString(associations[i].model1.name)) return false;
    if(_.indexOf(this.model_names_, associations[i].model1.name) === -1)
      return false;
    if(!_.isObject(associations[i].model2)) return false;
    if(!_.isString(associations[i].model2.id)) return false;
    if(!_.isString(associations[i].model2.name)) return false;
    if(_.indexOf(this.model_names_, associations[i].model2.name) === -1)
      return false;
  }
  return true;
};

module.exports = metamodel;
