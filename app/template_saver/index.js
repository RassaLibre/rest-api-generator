var _ = require('underscore');
var fs = require('fs');

/**
*
* @constructor
* @param {Array} duplicated_templates
* @param {Array} normal_templates
*/
var Template_saver = function(duplicated_templates, normal_templates){

  /**
  * @type {Array}
  */
  this.duplicated_templates = duplicated_templates;

  /**
  * @type {Array}
  */
  this.normal_templates = normal_templates;

};

/**
* saves the duplicated templates
*/
Template_saver.prototype.save_duplicated_templates = function() {
  for(var i = 0; i < this.duplicated_templates.length; i++){
    var splited = _.last(this.duplicated_templates[i].path.split('/')).split('.');
    var new_file_suffix = _.last(splited);
    var duplicated_template = this.duplicated_templates[i];
    var duplicates = Object.keys(duplicated_template['executed_templates']);
    for(var j = 0; j < duplicates.length; j++){
      var duplicate  = duplicates[j];
      fs.writeFileSync('generated/'+duplicate+'.'+new_file_suffix,
        duplicated_template['executed_templates'][duplicate], 'utf8');
    }
  }
};

/**
* function saves the normal templates
*/
Template_saver.prototype.save_normal_templates = function() {
  for(var i = 0; i < this.normal_templates.length; i++){
    var splited = _.last(this.normal_templates[i].path.split('/')).split('.');
    var new_file_suffix = _.last(splited);
    var new_file_name = _.first(splited);
    fs.writeFileSync('generated/'+new_file_name+'.'+new_file_suffix,
      this.normal_templates[i]['executed_template'], 'utf8');
  }
};

module.exports = Template_saver;