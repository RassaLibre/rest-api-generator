fs = require('fs');
var config = require('../../config/config');
var _ = require('underscore');

var generate_handlers = {

  /**
  * generate NodeJS server
  */
  nodejs: function(req, res){
    //TODO: validate incoming data against metamodel
    //TODO: DSM
    fs.readFile(config.TEMPLATE_DIR+'main'+config.TEMPLATE_SUFFIX, "utf8", function(error, data){
      var temp = _.template(data)({name : "Tomas"});
      res.send(temp);
    });
  },

  /**
  * generate Golang server
  */
  golang: function(req, res){
    res.send('Golang generator');
  }

};

module.exports = generate_handlers;
