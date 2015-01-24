fs = require('fs');
var config = require('../../config/config');
var _ = require('underscore');
var Metamodel = require('../metamodel');
var Scope = require('../scope');
var Template_Loader = require('../template_loader');

var generate_handlers = {

  /**
  * generate NodeJS server
  */
  nodejs: function(req, res){
    var model = req.body;
    var metamodel = new Metamodel();
    if(metamodel.validate(model)){
      var scope = new Scope(model);
      var template_loader = new Template_Loader(config.TEMPLATE_DIR, scope);
      template_loader.load_config_file();
      res.send('have no idea, look to the console');
      /**
      fs.readFile(config.TEMPLATE_DIR+'config.json', "utf8", function(error, data){
        //var temp = _.template(data)({name : "Tomas"});
        res.send(JSON.parse(data));
      });
      **/
    }
  },

  /**
  * generate Golang server
  */
  golang: function(req, res){
    res.send('Golang generator');
  }

};

module.exports = generate_handlers;
