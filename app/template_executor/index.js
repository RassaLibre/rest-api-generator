var _ = require('underscore');

/**
* the prototype is managing template execution
* @constructor
* @param {Array} duplicated_templates
* @param {Array} normal_templates
* @param {Object} scope
*/
var Template_Executor = function(duplicated_templates, normal_templates, scope){

  /**
  * @type {Array}
  */
  this.duplicated_templates = duplicated_templates;

  /**
  * @type {Array}
  */
  this.normal_templates = normal_templates;

  /**
  * @type {Object}
  */
  this.scope = scope;
};

/**
* function executes the duplicated templates and store them into the property
* executed_templates as an array where the key is the reference (reference
* property in the config)
*/
Template_Executor.prototype.execute_duplicated_templates = function(){
  for(var i = 0; i < this.duplicated_templates.length; i++){
    var original_scope = this.scope;
    var desired_scope = this.duplicated_templates[i].scope;
    var splited_desired_scope = desired_scope.split('.');     //eg. ['model','models']
    var temp_scope = original_scope;
    for(var j = 0; j < splited_desired_scope.length; j++){    //find the array in the model
      if(!_.isUndefined(temp_scope[splited_desired_scope[j]])){
        temp_scope = temp_scope[splited_desired_scope[j]];
      }
      else console.log('ERROR: duplicating templates - no such variable');
    }
    if(!_.isArray(temp_scope)) console.log('ERROR: duplicated templates - it is not an array');
    for(var j = 0; j < temp_scope.length; j++){ //for each in the scope (for exmaple for each model)
      var new_scope = {scope: this.scope};
      new_scope[this.duplicated_templates[i].reference] = temp_scope[j];  //save the model in the new scope based on the reference
      var executed_template = this.duplicated_templates[i]['template_function'](new_scope);
      if(_.isUndefined(this.duplicated_templates[i]['executed_templates'])) 
        this.duplicated_templates[i]['executed_templates'] = [];
      var name_property = this.duplicated_templates[i]['name_property'];
      var name = temp_scope[j][name_property];
      this.duplicated_templates[i]['executed_templates'][name] = executed_template;
    }
  }
};

/**
* function executes the normal templates and saves the result into the
* template as a "executed template" parameter
*/
Template_Executor.prototype.execute_normal_templates = function(){
  for(var i = 0; i < this.normal_templates.length; i++){
    var executed_template =
      this.normal_templates[i]['template_function']({scope: this.scope});
    this.normal_templates[i]['executed_template'] = executed_template;
  }
};

/**
* function returns normal templates
* @return {Array}
*/
Template_Executor.prototype.get_normal_templates = function(){
  return this.normal_templates;
};

/**
* function returns duplicated templates
* @return {Array}
*/
Template_Executor.prototype.get_duplicated_templates = function(){
  return this.duplicated_templates;
};



module.exports = Template_Executor;