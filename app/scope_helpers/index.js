var pluralize = require('pluralize');
var _ = require('underscore');

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
  //if nothing try to upercase the first letter
  var upercase_name = name.charAt(0).toUpperCase() + name.slice(1);
  for(var i = 0; i < models.length; i++){
    if(models[i].name === upercase_name){
      return models[i];
    }
  }
  //if still nothing, try to pluralize the name
  for(var i = 0; i < models.length; i++){
    if(pluralize.plural(models[i].name,2) === upercase_name){
      return models[i];
    }
  }
  return null;
};

/**
* function gats an url and goes throw the it from the end to the beginning
*  and returns the first part of url which does not start with :
* for example if 'ovens/:id/parts/:parts_id' are passed, 'parts' will be returned
* @param {String} url
* @param {String}
*/
helpers["get_latest_param_name"] = function(url){
  var splited = url.split('/');
  var i = splited.length;
  while(i--){
    if((splited[i].indexOf(':') === -1)&&(splited[i].length)) return splited[i];
  }
  return null;
}

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

/**
* function splits the passed url according to slashes and returns it as an
* array. It also cleans up double-dots from in parameters
* @param {String} url (for example ovens/:id/parts/:parts_id)
* @return {Array} (for example ['ovens','id','parts','parts_id'])
*/
helpers["split_url"] = function(url){
  var splited = url.split('/');
  for(var i = 0; i < splited.length; i++){
    splited[i] = splited[i].replace(':','');
  }
  return splited;
}

/**
* function returns blueprint friendly URLs
* it checks if the URL begins with '/' and if not, it adds it there
* it checks if the URL ends with '/' and if so, it removes it
* it also reformats the parameters so instead of : they are enclosed in {}
* @param {string} url
*/
helpers["blueprint_friendly_url"] = function(url){
  if(url.charAt(0) != '/') url = '/'+url;
  if(url.charAt(url.length-1) == '/') url = url.substring(0, url.length - 1);
  var splited = url.split('/');
  for(var i = 0; i < splited.length; i++){
    if(splited[i].indexOf(':') > -1){
      splited[i] = '{'+splited[i].replace(':','')+'}';
    }
  }
  url = splited.join('/');
  return url;
};

/**
* function returns boolean based on if the passed param is one of the
* props name or not
* @param {Array} props
* @param {String} param
* @return {Boolean}
*/
helpers["is_valid_prop_name"] = function(props, param){
  for(var i = 0; i < props.length; i++){
    if(props[i].name === param) return true;
  }
  return false;
}

/**
* receives an URL and returns the parts of the URL as an array
* it also filters the : when params occure
* @param {String} url
* @return {Array}
*/
helpers["get_parameter_names"] = function(url){
  var splited = url.split('/');
  var params = [];
  for(var i = 0; i < splited.length; i++){
    if(splited[i].indexOf(':') > -1) params.push(splited[i].replace(':',''));
  }
  return params;
};


/**
* function gets the model and returns the endpoints in a blueprint friendly
* way. This function is only used in the blueprint template
* @param {Object} model
* @return {Array}
*/
helpers['blueprint_friendly_models'] = function(model){
  var formated_endpoints = [];
  for(var i = 0; i < model.endpoints.length; i++){
    if(_.isUndefined(formated_endpoints[model.endpoints[i].url])){
      formated_endpoints[model.endpoints[i].url] = [];
    }
    formated_endpoints[model.endpoints[i].url].push(model.endpoints[i]);
  }
  return formated_endpoints;
}

/**
* The function gets an endpoint and returns a human readable description
* of what the endpoint is actually doing
* @param {Object} endpoint
* @return {String}
*/
helpers['get_natural_language_for_endpoint'] = function(endpoint){
  var sentence = '';
  if(endpoint.type === 'GET') sentence = 'get';
  else if(endpoint.type === 'POST') sentence = 'add';
  else if(endpoint.type === 'DELETE') sentence = 'remove';
  else sentence = 'edit';
  var splited = endpoint.url.split('/');
  if(endpoint.url.match(/^\/?[a-z-_]+\/?$/i)){
    sentence = sentence + ' ' + splited[0];
  }
  if(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/?$/i)){
    sentence = sentence + ' ' + pluralize.singular(splited[0]);
  }
  if(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+$/i)){
    var preposition;
    if(endpoint.type === 'GET') preposition = 'from';
    else if(endpoint.type === 'POST') preposition = 'to';
    else if(endpoint.type === 'DELETE') preposition = 'from';
    else preposition = 'in';
    sentence = sentence + ' ' + splited[2] + ' '+ preposition +' ' + pluralize.singular(splited[0]);
  }
  if(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+\/:[a-z_-]+$/i)){
    var preposition;
    if(endpoint.type === 'GET') preposition = 'from';
    else if(endpoint.type === 'POST') preposition = 'to';
    else if(endpoint.type === 'DELETE') preposition = 'from';
    else preposition = 'in';
    sentence = sentence + ' ' + pluralize.singular(splited[2]) + ' '+preposition+' ' + pluralize.singular(splited[0]);
  }
  return sentence;
}

/**
* function returns the passed param with a capital letter
* @param {String} string
* @return {String}
*/
helpers["capitalise_first_leter"] = function(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
* function returns valid IDs which is used in the blueprint generator
* so Dredd can use real IDs to test the URLs
* @param {String} url in the blueprint friendly format
* @param {String} param
* @return {String}
*/
helpers["get_valid_url_params"] = function(url, param){
  var data = {
    "ovens/:id" : {
      "id" : "54d10585e4b00a11b540d01b"
    },
    "pallets/:id" : {
      "id" : "54d0bf38e9cc9063148461e5"
    },
    "pallets/:id/parts" : {
      "id" : "54d0bf38e9cc9063148461e5"
    },
    "pallets/:id/parts/:part_id" : {
      "id" : "54d0bf38e9cc9063148461e5",
      "part_id" : "54d3e26b09d8c002113b0c6e"
    },
    "locations/:id" : {
      "id" : "54d10385e4b00a11b540cfff"
    },
    "parts/:id" : {
      "id" : "54d3d1d4a554e10f0be08900"
    },
    "parts/:id/pallets" : {
      "id" : "54d3d1d4a554e10f0be08900"
    }
  };
  if(data[url])
    return data[url][param];
  else return '';
}

module.exports = helpers;
