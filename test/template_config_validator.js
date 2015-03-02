var assert = require("assert"); // node.js core module
var Template_Config_Validator = require('../app/template_config_validator');
var example_data = require('./example_template_config');

describe('Template Config Validator',function(){

  var template_config_validator = new Template_Config_Validator();

  it('should evaluate the config file as valid',function(){
    assert.equal(template_config_validator.validate(example_data), true);
  });

});
