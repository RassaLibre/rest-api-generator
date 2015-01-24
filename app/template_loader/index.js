var fs = require('fs');
var async = require('async');
var _ = require('underscore');

/**
* function is responsible for loading the templates
* and managing the generation
* @constructor
* @param {String} template_path base path of the templates
* @param {Object} scope
*/
var Template_Loader = function(template_path, scope){

  /**
  * base template path
  * @type {String}
  */
  this.template_path = template_path;

  /**
  * scope for executing the templates
  * @type {Object}
  */
  this.scope = scope;

  /**
  * variable holds the configuration file which contains
  * all information needed about the template files
  */
  this.config = {};

};

/**
* function loads the configuration file and saves it
* @return {Boolean} was the config loaded?
*/
Template_Loader.prototype.load_config_file = function(){
  var self = this;
  fs.readFile(this.template_path+'config.json', "utf8",
    function(error, data){
      if(error) console.log('error loading the config file');
      self.config = JSON.parse(data);
      self.load_atomic_templates();
    }
  );
};

/**
* function loads the atomic templates
* maybe, i dunno
*/
Template_Loader.prototype.load_atomic_templates = function(){
  var self = this;
  async.each(this.config.templates.atomic,
    function(template, callback){
      fs.readFile(self.template_path+template.path, "utf8",
        function(error, data){
          if(error) callback(error);
          else{
            var template_name = template.path.split('.')[0];
            var template_function = _.template(data);
            self.scope.register_scope_variable(template_name, template_function);
            callback();
          }
        }
      );
    },
    function(error){
      if(error) console.log('ERROR:'+error);
      else console.log('it seems like that atomic templates has been loaded');
      console.log(self.scope.get_scope());
    }
  );
};



module.exports = Template_Loader;