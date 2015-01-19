fs = require('fs');
var config = require('../../config/config');

module.exports = function(req, res){
  fs.readFile(config.TEMPLATE_DIR+'main'+config.TEMPLATE_SUFFIX, "utf8", function(error, data){
    res.send(data);
  });
};