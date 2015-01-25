var assert = require("assert"); // node.js core module
var Template_Saver = require('../app/template_saver');
var fs = require('fs');
var rmdir = require('rimraf');

describe('Template Saver', function(){

  var template_saver, duplicated_templates, normal_templates, random;

  var remove_templates = function(){
    rmdir.sync('test/generated');
    fs.mkdirSync('test/generated');  
  };

  beforeEach(function(){
    random = Math.random()*100;
    duplicated_templates = [{
      "path" : "duplicated.tmpl.js",
      "scope" : "model.models",
      "reference" : "model",
      "name_property" : "name",
      "executed_templates" : []
    },
    {
      "path" : "duplicated2.tmpl.js",
      "scope" : "model.models",
      "reference" : "model",
      "name_property" : "name",
      "executed_templates" : [],
      "destination" : "models/" 
    },
    {
      "path" : "duplicated2/duplicated3.tmpl.js",
      "scope" : "model.models",
      "reference" : "model",
      "name_property" : "name",
      "executed_templates" : []  
    },
    {
      "path" : "duplicated3/duplicated4.tmpl.js",
      "scope" : "model.models",
      "reference" : "model",
      "name_property" : "name",
      "executed_templates" : [],
      "destination" : "models2/"  
    }
    ];
    for(var j = 0; j < duplicated_templates.length; j++){
      duplicated_templates[j]["executed_templates"]["Oven"] = "Oven template"+random;
      duplicated_templates[j]["executed_templates"]["Part"] = "Part template"+random;
      duplicated_templates[j]["executed_templates"]["Location"] = "Location template"+random;
    }

    normal_templates = [{
      "path" : "normal.tmpl.js",
      "executed_template" : "Executed normal template"+random
    },
    {
      "path" : "normal2/normal2.tmpl.js",
      "executed_template" : "Executed normal template"+random
    },
    {
      "path" : "normal3.tmpl.js",
      "executed_template" : "Executed normal template"+random,
      "destination" : "normal3/"
    },
    {
      "path" : "normal2/normal4.tmpl.js",
      "executed_template" : "Executed normal template"+random,
      "destination" : "normal3/"
    }
    ];
    template_saver = new Template_Saver(duplicated_templates, normal_templates, 'test/generated/');
  });

  it('should be defined', function(){
    assert.equal(typeof template_saver, "object");
  });

  it('should save the normal templates with a correct name', function(){
    remove_templates();
    template_saver.save_normal_templates();
    assert.equal(fs.readFileSync('test/generated/normal.js',"utf8"), "Executed normal template"+random);
  });

  it('should save the duplicated templates with the correct name', function(){
    template_saver.save_duplicated_templates();
    assert.equal(fs.readFileSync('test/generated/Oven.js',"utf8"), "Oven template"+random);
    assert.equal(fs.readFileSync('test/generated/Location.js',"utf8"), "Location template"+random);
    assert.equal(fs.readFileSync('test/generated/Part.js',"utf8"), "Part template"+random);
  });

  it('should work with normal templates in subfolder', function(){
    remove_templates();
    template_saver.save_normal_templates();
    assert.equal(fs.readFileSync('test/generated/normal2/normal2.js',"utf8"), "Executed normal template"+random);
  });

  it('should save normal templates according to the destination param', function(){
    remove_templates();
    template_saver.save_normal_templates(); 
    assert.equal(fs.readFileSync('test/generated/normal3/normal3.js',"utf8"), "Executed normal template"+random); 
  });

  it('should be able to combine destination and subfolder with normal templates', function(){
    remove_templates();
    template_saver.save_normal_templates(); 
    assert.equal(fs.readFileSync('test/generated/normal3/normal4.js',"utf8"), "Executed normal template"+random);
  });

  it('should save duplicated templates according to the destination param', function(){
    remove_templates();
    template_saver.save_duplicated_templates();
    assert.equal(fs.readFileSync('test/generated/models/Oven.js',"utf8"), "Oven template"+random);
    assert.equal(fs.readFileSync('test/generated/models/Location.js',"utf8"), "Location template"+random);
    assert.equal(fs.readFileSync('test/generated/models/Part.js',"utf8"), "Part template"+random);
  });

  it('should work with duplicated templates in subfolder', function(){
    remove_templates();
    template_saver.save_duplicated_templates();
    assert.equal(fs.readFileSync('test/generated/duplicated2/Oven.js',"utf8"), "Oven template"+random);
    assert.equal(fs.readFileSync('test/generated/duplicated2/Location.js',"utf8"), "Location template"+random);
    assert.equal(fs.readFileSync('test/generated/duplicated2/Part.js',"utf8"), "Part template"+random);
  });

  it('should be able to combine destination and subfolder with duplicated templates', function(){
    remove_templates();
    template_saver.save_duplicated_templates();
    assert.equal(fs.readFileSync('test/generated/models2/Oven.js',"utf8"), "Oven template"+random);
    assert.equal(fs.readFileSync('test/generated/models2/Location.js',"utf8"), "Location template"+random);
    assert.equal(fs.readFileSync('test/generated/models2/Part.js',"utf8"), "Part template"+random);
  });

  it('should determine the right file suffix', function(){
    var ext = template_saver.determine_file_suffix('something/something/darkside.something.js');
    assert.equal(ext, 'js');
  });

  it('should determine the right file name', function(){
    var ext = template_saver.determine_file_name('something/something/darkside.something.js');
    assert.equal(ext, 'darkside');
  });

});