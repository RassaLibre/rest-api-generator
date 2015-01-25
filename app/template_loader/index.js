var fs = require('fs');
var _ = require('underscore');

/**
* function is responsible for loading the templates
* and managing the generation
* @constructor
* @param {String} template_path base path of the templates
*/
var Template_Loader = function(template_path){

  /**
  * base template path
  * @type {String}
  */
  this.template_path = template_path;

  /**
  * variable holds the configuration file which contains
  * all information needed about the template files
  * @type {Object}
  */
  this.config = {};

  /**
  * storing atomic templates
  * @type {Array}
  */
  this.atomic_templates = [];

  /**
  * storing duplicated templates
  * @type {Array}
  */
  this.duplicated_templates = [];

  /**
  * storing normal templates
  * @type {Array}
  */
  this.normal_templates = [];

};

/**
* function loads the configuration file, saves it and returns it
* @return {Object} config file
*/
Template_Loader.prototype.load_config_file = function(){
  var config_string = fs.readFileSync(this.template_path+'config.json', "utf8");
  this.config = JSON.parse(config_string);
  return this.config;
};

/**
* function loads the atomic templates and stores them in the property
* atomic_templates as a function ready to be executed
*/
Template_Loader.prototype.load_atomic_templates = function(){
  if(_.isUndefined(this.config)) this.load_config_file();
  for(var i = 0; i < this.config.templates.atomic.length; i++){
    var template_string = fs.readFileSync(this.template_path+this.config.templates.atomic[i].path, "utf8");
    var template_name = this.get_template_name_(this.config.templates.atomic[i].path);
    this.atomic_templates[template_name] = _.template(template_string);
  }
}

/**
* function loads the duplicated templates and stores them in the property
* duplicated_templates as a object from config + it adds template_function
* for executing the template
*/
Template_Loader.prototype.load_duplicated_templates = function(){
  if(_.isUndefined(this.config)) this.load_config_file();
  for(var i = 0; i < this.config.templates.duplicated.length; i++){
    var template_object = this.config.templates.duplicated[i];
    var template_string = fs.readFileSync(this.template_path+template_object.path, "utf8");
    template_object["template_function"] = _.template(template_string);
    this.duplicated_templates.push(template_object);
  }
};

/**
* function loads the normal templates and stores them in the property
* normal_templates as a object from config + it adds template_function
* for executing the template
*/
Template_Loader.prototype.load_normal_templates = function(){
  if(_.isUndefined(this.config)) this.load_config_file();
  for(var i = 0; i < this.config.templates.normal.length; i++){
    var template_object = this.config.templates.normal[i];
    var template_string = fs.readFileSync(this.template_path+template_object.path, "utf8");
    template_object["template_function"] = _.template(template_string);
    this.normal_templates.push(template_object);
  }
};

/**
* function receives path to a template and returns its name
* @param {String} path
* @return {String}
*/
Template_Loader.prototype.get_template_name_ = function(path){
    var file = _.last(path.split('/'));
    var splited_file = file.split('.');
    var template_name = _.first(splited_file).replace(' ', '_');
    return template_name;
};

/**
* function return atomic templates
* @return {Array}
*/
Template_Loader.prototype.get_atomic_templates = function(){
  return this.atomic_templates;
};

/**
* function return normal templates
* @return {Array}
*/
Template_Loader.prototype.get_normal_templates = function(){
  return this.normal_templates;
};

/**
* function return duplicated templates
* @return {Array}
*/
Template_Loader.prototype.get_duplicated_templates = function(){
  return this.duplicated_templates;
};

module.exports = Template_Loader;