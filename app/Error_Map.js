var _ = require('underscore');

/**
* possible errors in the application
* @type {Object}
*/
var error = {
  INVALID_MODEL : {code: 100, httpStatus: 400, developer_message: "The passed model is not valid"}
};

/**
* function gets an error code and returns
* the complete error
* @param {Integer} code
* @return {Object!}
*/
function get_error(code){
  var keys = _.keys(error);
  for(var i = 0; i < keys.length; i++){
    if(error[keys[i]].code === code) return error[keys[i]];
  }
  return null;
}

/**
* function sends the error specified by the passed code as an response
* which is passed to the function. If a developer message is specified, this
* message overwrites the native one
* @param {Object} res
* @param {Integer} code
* @param {String} dev_message
*/
function send_error(res, code, dev_message){
  var error = get_error(code);
  if(!error) error = get_error(101);
  if(dev_message) error.developer_message = dev_message;
  res.status(error.httpStatus).send(error);
}

/**
* export
*/
_.forEach(error, function(val, key) {module.exports[key] = key;});
module.exports.send_error = send_error;
module.exports.get_error = get_error;