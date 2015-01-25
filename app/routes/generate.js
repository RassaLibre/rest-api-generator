fs = require('fs');
var config = require('../../config/config');
var _ = require('underscore');
var Metamodel = require('../metamodel');
var Scope = require('../scope');
var Template_Loader = require('../template_loader');
var Template_Executor = require('../template_executor');
var Template_Saver = require('../template_saver');

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
      template_loader.load_atomic_templates();
      template_loader.load_normal_templates();
      template_loader.load_duplicated_templates();
      var atomic_templates = template_loader.get_atomic_templates();
      scope.register_scope_array(atomic_templates); //register atomic templates in scope
      var duplicated_templates = template_loader.get_duplicated_templates();
      var normal_templates = template_loader.get_normal_templates();
      var template_executor = new Template_Executor(duplicated_templates, normal_templates ,scope.get_scope());
      template_executor.execute_duplicated_templates();
      template_executor.execute_normal_templates();
      normal_templates = template_executor.get_normal_templates();
      duplicated_templates = template_executor.get_duplicated_templates();
      var template_saver = new Template_Saver(duplicated_templates, normal_templates);
      template_saver.save_duplicated_templates();
      template_saver.save_normal_templates();
      res.send('have no idea, look to the console');
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
