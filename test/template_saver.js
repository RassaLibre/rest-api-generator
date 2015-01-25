var assert = require("assert"); // node.js core module
var Template_Saver = require('../app/template_saver');
var fs = require('fs');

describe('Template Saver', function(){

  var template_saver, duplicated_templates, normal_templates, random;

  beforeEach(function(){
    random = Math.random()*100;
    duplicated_templates = [{
      "path" : "duplicated.tmpl.js",
      "scope" : "model.models",
      "reference" : "model",
      "name_property" : "name",
      "destination" : "models/",
      "executed_templates" : []
    }];
    duplicated_templates[0]["executed_templates"]["Oven"] = "Oven template"+random;
    duplicated_templates[0]["executed_templates"]["Part"] = "Part template"+random;
    duplicated_templates[0]["executed_templates"]["Location"] = "Location template"+random;    
    normal_templates = [{
      "path" : "normal.tmpl.js",
      "destination" : "",
      "executed_template" : "Executed normal template"+random
    }];
    template_saver = new Template_Saver(duplicated_templates, normal_templates, 'test/generated/');
  });

  it('should be defined', function(){
    assert.equal(typeof template_saver, "object");
  });

  it('should save the normal templates with a correct name', function(){
    template_saver.save_normal_templates();
    assert.equal(fs.readFileSync('test/generated/normal.js',"utf8"), "Executed normal template"+random);
  });

  it('should save the duplicated templates with the correct name', function(){
    template_saver.save_duplicated_templates();
    assert.equal(fs.readFileSync('test/generated/Oven.js',"utf8"), "Oven template"+random);
    assert.equal(fs.readFileSync('test/generated/Location.js',"utf8"), "Location template"+random);
    assert.equal(fs.readFileSync('test/generated/Part.js',"utf8"), "Part template"+random);
  });

});