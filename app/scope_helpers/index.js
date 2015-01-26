
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

module.exports = helpers;