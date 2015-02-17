
/**
* Abstract prototype for metamodels
* every metamodel should inherit this one
*/
var metamodel_abstract = function(){};

/**
* function valides the model and returns true if the model is valid
* @param {Object} model to be validate
* @return {Boolean}
*/
metamodel_abstract.prototype.validate = function(model){
  return false;
};

/**
* export the module
*/
module.exports = metamodel_abstract;