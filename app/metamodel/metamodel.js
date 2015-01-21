
/**
* metamodel of the possed input. This prototype is responsible for validating
* the input model
* @param {Object} data
*/
var metamodel = function(data){
  this.data = data;
};

/**
* function validates the incoming data
*/
metamodel.prototype.validate = function(){
  //TODO: Has to be an object, with properties 'models' and 'associations'
  //      and all that kinda stuff
};

module.exports = metamodel;