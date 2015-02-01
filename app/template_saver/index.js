var _ = require('underscore');
var fs = require('fs');

/**
*
* @constructor
* @param {Array} duplicated_templates
* @param {Array} normal_templates
* @param {String} destination
*/
var Template_saver = function(duplicated_templates, normal_templates, destination){

  /**
  * @type {Array}
  */
  this.duplicated_templates = duplicated_templates;

  /**
  * @type {Array}
  */
  this.normal_templates = normal_templates;

  /**
  * destination where the template should be saved
  * @type {string}
  */
  this.destination = destination;

};

/**
* saves the duplicated templates
*/
Template_saver.prototype.save_duplicated_templates = function() {
  for(var i = 0; i < this.duplicated_templates.length; i++){
    var duplicated_template = this.duplicated_templates[i];
    var new_file_suffix = this.determine_file_suffix(duplicated_template.path);
    var folders;
    if(!_.isUndefined(duplicated_template.destination)){  //if the destination is defined
      folders = this.create_folder_structure(duplicated_template.destination+'.'
        +new_file_suffix);
    }
    else folders = this.create_folder_structure(duplicated_template.path);
    var duplicates = Object.keys(duplicated_template['executed_templates']);    //keys like "Oven","Part"
    for(var j = 0; j < duplicates.length; j++){                                 //go through all of them and save them
      var duplicate  = duplicates[j];
      fs.writeFileSync(folders+duplicate+'.'+new_file_suffix,
        duplicated_template['executed_templates'][duplicate], 'utf8');
    }
  }
  console.log('done with the duplicated templates');
};

/**
* function gets a filepath and creates all the folders in the path
* @param {String} path for example 'sample/sample2/file.tmpl.js'
* @return {String} created folder structure
*/
Template_saver.prototype.create_folder_structure = function(path){
  if(path.indexOf('/') === -1) return this.destination;
  else{
    var splited = path.split('/');
    var temp_path = this.destination.substring(0, this.destination.length - 1); //because i do not want / at the end
    for(var i = 0; i < splited.length-1; i++){  //-1 becuase the last one is the file itself
      if(!fs.existsSync(temp_path+'/'+splited[i])){ //create only if the folder does not exists
        fs.mkdirSync(temp_path+'/'+splited[i]);
      }
      temp_path = temp_path + '/' + splited[i];
    }
    return temp_path+'/';
  }
};

/**
* function get path and returns the file suffix in the path
* @param {String} path for example 'sample/sample2/file.tmpl.js'
* @return {String}
*/
Template_saver.prototype.determine_file_suffix = function(path){
  return _.last(_.last(path.split('/')).split('.'));
};

/**
* function get path and returns the file name in the path
* @param {String} path for example 'sample/sample2/file.tmpl.js'
* @return {String}
*/
Template_saver.prototype.determine_file_name = function(path){
  return _.first(_.last(path.split('/')).split('.'));
};

/**
* function checks the passed file and removes lines which have only whitespaces
* this is because underscore templates leave an empty line everytime there is a
* code which is pretty annoying
* @param {String} loaded file
* @return {String}
*/
Template_saver.prototype.remove_lines_with_whitespaces = function(file){
  var lines = file.split('\n');
  var loop = lines.length;
  while(loop--){
    if(lines[loop].match(/^[ ]+$/i)) lines.splice(loop,1); 
  }
  var as_string_again = '';
  for(var i = 0; i < lines.length; i++){
    if(i !== 0) as_string_again = as_string_again + '\n' + lines[i];
    else as_string_again = lines[i];
  }
  return as_string_again;
};

/**
* function saves the normal templates
*/
Template_saver.prototype.save_normal_templates = function() {
  for(var i = 0; i < this.normal_templates.length; i++){
    var normal_template = this.normal_templates[i];
    var new_file_suffix = this.determine_file_suffix(normal_template.path);
    var new_file_name = this.determine_file_name(normal_template.path);
    var folders;
    if(!_.isUndefined(normal_template.destination)){  //if the destination is defined
      folders = this.create_folder_structure(normal_template.destination+
        new_file_name+'.'+new_file_suffix);
    }
    else folders = this.create_folder_structure(normal_template.path);
    var without_whitespaces = this.remove_lines_with_whitespaces(normal_template['executed_template']);
    fs.writeFileSync(folders+new_file_name+'.'+new_file_suffix, without_whitespaces, 'utf8');
  }
  console.log('done with the normal templates');
};

module.exports = Template_saver;