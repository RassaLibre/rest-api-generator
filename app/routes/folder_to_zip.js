fs = require('fs');
var config = require('../../config/config');
var _ = require('underscore');
var Metamodel = require('../metamodel');
var Scope = require('../scope');
var Template_Loader = require('../template_loader');
var Template_Executor = require('../template_executor');
var Template_Saver = require('../template_saver');
var Template_Beautifier = require('../template_beautifier');
var tgz = require('express-tgz');

var generate_handlers = {

  /**
  * generate NodeJS server
  * @param {Object} req
  * @param {Object} res
  */
  nodejs: function(req, res){
    //validate metamodel
    var model = req.body;
    var metamodel = new Metamodel();
    if(metamodel.validate(model)){
      var scope = new Scope(model);
      //load the templates
      var template_loader = new Template_Loader(config.TEMPLATE_DIR, config.TEMPLATE_CONFIG_FILE_NAME);
      template_loader.load_config_file();
      template_loader.load_atomic_templates();
      template_loader.load_normal_templates();
      template_loader.load_duplicated_templates();
      var atomic_templates = template_loader.get_atomic_templates();
      //register atomic templates in scope
      scope.register_scope_array(atomic_templates);
      var duplicated_templates = template_loader.get_duplicated_templates();
      var normal_templates = template_loader.get_normal_templates();
      //execute the templates
      var template_executor = new Template_Executor(duplicated_templates, normal_templates ,scope.get_scope());
      template_executor.execute_duplicated_templates();
      template_executor.execute_normal_templates();
      normal_templates = template_executor.get_normal_templates();
      duplicated_templates = template_executor.get_duplicated_templates();
      //beutify the templates
      var template_beautifier = new Template_Beautifier(normal_templates, duplicated_templates);
      template_beautifier.beautify_normal_templates();
      template_beautifier.beautify_duplicated_templates();
      normal_templates = template_beautifier.get_normal_templates();
      duplicated_templates = template_beautifier.get_duplicated_templates();
      //save the templates
      var template_saver = new Template_Saver(duplicated_templates, normal_templates, config.OUTPUT_DIR);
      template_saver.save_duplicated_templates();
      template_saver.save_normal_templates();
      res.tgz('generated/', 'api.tar.gz', false);     
    }
  }
};

module.exports = generate_handlers;
