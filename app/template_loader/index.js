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
* function loads the atomic templates and attaches them all to the scope
* variable. Once that is done,
*/
Template_Loader.prototype.load_atomic_templates = function(){
  var self = this;
  async.each(this.config.templates.atomic,  //load all atomic templates in parallel
    function(template, callback){
      fs.readFile(self.template_path+template.path, "utf8",
        function(error, data){  //read the atomic templates and store them in scope
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
    function(error){  //once all loading is done, load, execute and save duplicated and normal templates
      if(error) console.log('ERROR:'+error);
      else console.log('it seems like that atomic templates has been loaded');
      async.parallel(
        [
          function(callback){
            async.each(self.config.templates.duplicated,
              function(template, each_callback){
                fs.readFile(self.template_path+template.path, "utf8",
                  function(error, data){
                    if(error) each_callback(error);
                    else{
                      var original_scope = self.scope.get_scope();
                      var desired_scope = template.scope;
                      var splited_desired_scope = desired_scope.split('.');
                      
                      var temp_scope = original_scope;
                      for(var i = 0; i < splited_desired_scope.length; i++){
                        if(!_.isUndefined(temp_scope[splited_desired_scope[i]])){
                          temp_scope = temp_scope[splited_desired_scope[i]];
                        }
                        else console.log('no such variable');
                      }
                      
                      if(!_.isArray(temp_scope)) console.log('it is not an erray');
                      console.log(temp_scope);
                      for(var i = 0; i < temp_scope.length; i++){
                        var new_scope = {};
                        new_scope[template.reference] = temp_scope[i];
                        var template_function = _.template(data);
                        var executed_template = template_function(new_scope);
                        var new_file_suffix = _.last(template.path.split('.'));
                        var new_file_name = temp_scope[i][template.name_property];
                        //TODO: implement destination
                        fs.writeFileSync('generated/'+new_file_name+'.'+new_file_suffix,
                          executed_template, 'utf8');    
                      }

                    }
                  }
                );
              },
              function(error){
                console.log(error, 'error loading duplicated stuff');
              }
            );
            //TODO: Load, exec and save duplicated
          },
          function(callback){
            async.each(self.config.templates.normal,
              function(template, each_callback){
                fs.readFile(self.template_path+template.path, "utf8",
                  function(error, data){
                    if(error) each_callback(error);
                    else{
                      var template_function = _.template(data);
                      var executed_template = template_function({scope: self.scope.get_scope()});
                      var new_file_suffix = _.last(template.path.split('.'));
                      var new_file_name = _.first(template.path.split('.'));
                      //implement destination
                      fs.writeFileSync('generated/'+new_file_name+'.'+new_file_suffix,
                        executed_template, 'utf8');
                    }
                  }
                );
              },
              function(error){
                console.log(error, 'error loading normal stuff');
              }
            );
            //TODO: Load, exec and save normal
          }
        ],
        function(error, results){
          console.log('all templates done!');
          //TODO: generate APIARY
        }
      );
    }
  );
};



module.exports = Template_Loader;