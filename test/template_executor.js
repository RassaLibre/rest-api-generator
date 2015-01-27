var assert = require("assert"); // node.js core module
var Template_Executor = require('../app/template_executor');
var _ = require('underscore');
var example_data = require('./example_data');

describe('Template_Executor', function(){

  var template_executor;

  beforeEach(function(){
    var duplicated_templates = [{
        "path" : "duplicated.tmpl.js",
        "scope" : "model.models",
        "reference" : "model",
        "name_property" : "name",
        "destination" : "models/",
        "template_function" : _.template('something silly')
      }];
    var normal_templates = [{
        "path" : "normal.tmpl.js",
        "destination" : "",
        "template_function" : _.template('something even more silly')
      },
      {
        "path" : "normal.tmpl.js",
        "destination" : "",
        "template_function" : _.template('It is possible to use <%= scope.atomic() %> templates')
      }
      ];
    var scope = {model: example_data, atomic: _.template("Atomic")};
    template_executor = new Template_Executor(duplicated_templates,
      normal_templates, scope);
  });

  it('should execute normal templates', function(){
    template_executor.execute_normal_templates();
    var normal_templates = template_executor.get_normal_templates();
    assert.equal(typeof normal_templates[0]['executed_template'], "string");
    assert.equal(normal_templates[0]['executed_template'], "something even more silly");
  });

  it('should execute duplicated templates', function(){
    template_executor.execute_duplicated_templates();
    var duplicated_templates = template_executor.get_duplicated_templates();
    assert.equal(Object.keys(duplicated_templates[0]['executed_templates']).length, 4);
    assert.equal(duplicated_templates[0]['executed_templates']['Oven'],"something silly");
  });

  it('should execute atomic templates in normal templates', function(){
    template_executor.execute_normal_templates();
    var normal_templates = template_executor.get_normal_templates();
    assert.equal(typeof normal_templates[1]['executed_template'], "string");
    assert.equal(normal_templates[1]['executed_template'], 'It is possible to use Atomic templates');
  });

});