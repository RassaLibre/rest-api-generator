var _ = require('underscore');
var beautify = require('js-beautify').js_beautify;

/**
* takes care of styles of the templates
* @param {Array} normal_templates
* @param {Array} duplicated_templates
*/
var Template_Beautifier = function(normal_templates, duplicated_templates){

  /**
  * @type {Array}
  */
  this.duplicated_templates = duplicated_templates;

  /**
  * @type {Array}
  */
  this.normal_templates = normal_templates;

  /**
  * The settings for the beautifier
  * @type {Object}
  */
  this.beautifier_settings = {
    indent_size: 2,
    max_preserve_newlines: 4,
    jslint_happy: true };

};

/**
* function takes care of the styles in normal templates so they follow
* conventions
*/
Template_Beautifier.prototype.beautify_normal_templates = function(){
  for(var i = 0; i < this.normal_templates.length; i++){
    //because we do not want to do it with the blueprint
    if(_.last(_.last(this.normal_templates[i]['path'].split('/')).split('.') === "js")){
      this.normal_templates[i]['executed_template'] =
        beautify(this.normal_templates[i]['executed_template'], this.beautifier_settings);
    }
  }
};

/**
* function takes care of the styles in duplicated templates so they follow
* conventions
*/
Template_Beautifier.prototype.beautify_duplicated_templates = function(){
  for(var i = 0; i < this.duplicated_templates.length; i++){
    var duplicates = Object.keys(this.duplicated_templates[i]['executed_templates']);    //keys like "Oven","Part"
    for(var j = 0; j < duplicates.length; j++){                                 //go through all of them and save them
      var duplicate  = duplicates[j];
      this.duplicated_templates[i]['executed_templates'][duplicate] =
      beautify(this.duplicated_templates[i]['executed_templates'][duplicate], this.beautifier_settings);
    }
  }
};

/**
* function returns normal templates
* @return {Array}
*/
Template_Beautifier.prototype.get_normal_templates = function(){
  return this.normal_templates;
};

/**
* function returns duplicated templates
* @return {Array}
*/
Template_Beautifier.prototype.get_duplicated_templates = function(){
  return this.duplicated_templates;
};

module.exports = Template_Beautifier;
