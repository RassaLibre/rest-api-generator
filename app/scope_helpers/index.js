var pluralize = require('pluralize');


/**
* array because there is a method in scope for adding such arrays to the scope
* @type {Array}
*/
var helpers = [];

/**
* function get an collection of models and return the model with the passed name
* @param {Array} models collection of models
* @param {String} name of the model to be found
* @return {Object!}
*/
helpers["get_model_by_name"] = function(models, name){
  for(var i = 0; i < models.length; i++){
    if(models[i].name === name){
      return models[i];
    }
  }
  return null;
};

/**
* function checks if the passed URL together with the passed method is
* singular or not.
* This means that if the URL is 'ovens/:id' and the method is GET, then the
* resource is obviously singular because it points to a specific resource
* This method is ment to be used when naming controllers "getOvens" or "getOven"
* etc.
* @param {String} url
* @param {String} method  
*/
helpers["is_singular_resource"] = function(url, method){
  var splited = url.split('/');
  var last = splited[splited.length-1];
  if(last.indexOf(':') !== -1){ //the url ends with a parameter
    if(method === "GET") return true;
    if(method === "POST") return false; //XXX does not make sense i think
    if(method === "PUT") return true;
    if(method === "DELETE") return true;
  }
  else{   //the url does not ends with a parameter
    if(method === "GET") return false;
    if(method === "POST") return true;
    if(method === "PUT") return false;  //XXX does not make sense i think
    if(method === "DELETE") return false;
  }
};

/**
* function gets url, method and id of an endpoint and creates a unique
* combination which can be used for naming controllers
* TODO: rewrite this one so it follows the native language rules
* @param {String} url
* @param {String} method
* @param {String} id
*/
helpers["get_controller_name"] = function(url, method, id){
  if(url.charAt(0) === '/') url = url.substring(1);
  var name = method.toLowerCase()+"_";
  var nouns = [];
  var splited = url.split('/');
  for(var i = 0; i < splited.length; i = i + 2){  //collect nouns in the url /ovens/:id/parts/
    nouns.push(splited[i]);
  }
  for(var j = nouns.length-1; j > -1; j--){
    name = name + nouns[j];
    if(j !== 0) name = name +"_in_";
  }
  return name+"_"+id.substring(1);
};

// regex for addresses with param at the end: ^(\/?[a-z_-]+\/\:[a-z_-]+\/?)+$
// regex for addresses without param at the end: ^\/?[a-z_-]+\/?(\/\:[a-z_-]+\/[a-z_-]+\/?)*$
// regex for nouns exept the first one: \/[:]{0}[a-z_-]+\/

module.exports = helpers;