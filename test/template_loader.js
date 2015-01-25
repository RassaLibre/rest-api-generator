var assert = require("assert"); // node.js core module
var Template_Loader = require('../app/template_loader');

describe('Template Loader', function(){

  var template_loader;

  beforeEach(function(){
    template_loader = new Template_Loader('templates/');
  });

  it('should be defined', function(){
    assert.equal(typeof template_loader, "object");
  });

  it('should load the config file', function(){
    var config_string = {"name" : "NodeJS REST API template collection","description" : "Template collection for creating NodeJS REST API",
                         "templates" : {"normal" : [{"path" : "normal.tmpl.js","destination" : ""}],"atomic" : [{"path" : "atomic.tmpl.js"}
                         ],"duplicated" : [{"path" : "duplicated.tmpl.js","scope" : "model.models","reference" : "model","name_property" : "name",
                         "destination" : "models/"}]}};
    var config_file = template_loader.load_config_file();
    assert.deepEqual(config_string, config_file);
    assert.deepEqual(config_string, template_loader.config);
  });

  it('should determine the right template name', function(){
    var name = template_loader.get_template_name_('templates/crap/atomic.tmpl.js');
    assert.equal(name, 'atomic');
  });

  it('should load the atomic templates', function(){
    template_loader.load_config_file();
    template_loader.load_atomic_templates();
    assert.equal(typeof template_loader.atomic_templates, "object"); 
    assert.equal(typeof template_loader.atomic_templates.atomic, "function");  
  });

  it('should load the duplicated templates', function(){
    template_loader.load_config_file();
    template_loader.load_duplicated_templates();
    assert.equal(template_loader.duplicated_templates.length, 1);
    assert.equal(template_loader.duplicated_templates[0].path, "duplicated.tmpl.js");
    assert.equal(typeof template_loader.duplicated_templates[0]['template_function'], "function"); 
  });

  it('should load the normal templates', function(){
    template_loader.load_config_file();
    template_loader.load_normal_templates();
    assert.equal(template_loader.normal_templates.length, 1);
    assert.equal(template_loader.normal_templates[0].path, "normal.tmpl.js");
    assert.equal(typeof template_loader.normal_templates[0]['template_function'], "function"); 
  });

});