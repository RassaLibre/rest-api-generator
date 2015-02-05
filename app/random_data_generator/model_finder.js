/**
* returns an entity in model based on the passed entity_name
* @param {String} entity_name
* @param {Object} model
* @return {Object}
*/
module.exports = function(entity_name, model){
  for(var i = 0; i < model.models.length; i++){
    if(model.models[i].name === entity_name){
      return model.models[i];
    }
  }
  return null;
};