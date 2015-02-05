var RandExp = require('randexp'); //generates random data based on passed regex
var _ = require('underscore');
var find_model = require('./model_finder');

/**
* function gets an entity and based on the properties
* generates matching object
* @param {Object} model
* @param {Object} entire_model
*/
var generate_data = function(model, entire_model){
  var to_be_returned = {};
  for(var i = 0; i < model.properties.length; i++){
    var property = model.properties[i].type;
    var property_name = model.properties[i].name;
    //if the property is string
    if(property.type === "string"){
      if(property.regex) var regEx = new RegExp(property.regex,"g");
      else var regEx = new RegExp("^[A-Z]{"+property.length+"}$","g");
      to_be_returned[property_name] = new RandExp(regEx).gen();
    }
    //if the property is integer or double
    else if((property.type === "integer")||(property.type === "double")){
      var min = property.min;
      var max = property.max;
      if((!_.isUndefined(min))&&(!_.isUndefined(max))){
        to_be_returned[property_name] =  Math.random() * (max - min) + min;
        if(property.type === "integer") to_be_returned[property_name] = Math.round(to_be_returned[property_name])
      }
      else if((_.isUndefined(min))&&(!_.isUndefined(max))){
        to_be_returned[property_name] = max - Math.random() * 100
        if(property.type === "integer") to_be_returned[property_name] = Math.round(to_be_returned[property_name])
      }
      else if((!_.isUndefined(min))&&(_.isUndefined(max))){
        to_be_returned[property_name] = min + Math.random() * 100
        if(property.type === "integer") to_be_returned[property_name] = Math.round(to_be_returned[property_name])
      }
      else{
        to_be_returned[property_name] = Math.random() * 100;
        if(property.type === "integer") to_be_returned[property_name] = Math.round(to_be_returned[property_name])
      }
    }
    //if the property is a timestamp
    else if(property.type === "timestamp"){
      to_be_returned[property_name] = Date.now();
    }
    //if the property is a geojson
    else if(property.type === "geojson"){
      to_be_returned[property_name] = {"type" : "Point", "coordinations" : [125.6, 10.1]};
    }
    else if(property.type === "array"){
      if(property.value === 'string'){
        var regEx = new RegExp("^[A-Z]{20}$","g");
        var randomiser = new RandExp(regEx);
        to_be_returned[property_name] = "["+randomizer.gen()+", "+randomizer.gen()+"]";
      }
      else if(property.value === 'integer'){
        to_be_returned[property_name] = "["+ Math.round(Math.random() * 100) +", "+ Math.round(Math.random() * 100) +" ]";
      }
      else if(property.value === 'double'){
        to_be_returned[property_name] = "["+ Math.random() * 100 +", "+ Math.random() * 100 +" ]";
      }
      else{
        var found_model = find_model(property.value, entire_model);
        to_be_returned[property_name] = [];
        to_be_returned[property_name].push(generate_data(found_model, entire_model));
        to_be_returned[property_name].push(generate_data(found_model, entire_model));
      }
    }
    else{
      var found_model = find_model(property.type, entire_model);
      to_be_returned[property_name] = generate_data(found_model, entire_model);
    }
  }
  return to_be_returned;
};

//export the function so it can be accessed from the outside
module.exports = generate_data;


