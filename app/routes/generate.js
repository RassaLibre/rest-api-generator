fs = require('fs');
var config = require('../../config/config');
var _ = require('underscore');

module.exports = function(req, res){
  fs.readFile(config.TEMPLATE_DIR+'main'+config.TEMPLATE_SUFFIX, "utf8", function(error, data){
    var temp = _.template(data)({name : "Tomas"});
    res.send(temp);
  });
};