var Model = require('./model');
var _ = require('underscore');

/**
* instantiate the model
*/
part.prototype = new Model();
part.prototype.constructor = part;
function part(){

/**
* set the fields
*/
this.fields = {
  name : {type: "string", regex: /^[A-Za-z0-9]+$/i, length: 30},
  value : {type: "integer", min: 0, max: 40},
  price : {type: "integer", min: 0}
};

};


module.exports = part;