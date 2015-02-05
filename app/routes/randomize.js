var config = require('../../config/config');
var _ = require('underscore');
var Metamodel = require('../metamodel');
var random_data_generator = require('../random_data_generator');

var randomize_handlers = {

  /**
  * generates random data based on the model
  */
  mongodb: function(req, res){
    var model = req.body;
    var to_be_returned = [];
    var metamodel = new Metamodel();

    if(metamodel.validate(model)){  //if the passed model is valid against metamodel
      for(var i = 0; i < model.models.length; i++){
        var entity = model.models[i];
        //console.log(random_data_generator.generate_data);
        var random_data = random_data_generator.generate_data(entity, model);
        to_be_returned.push(random_data);
      }
      res.send(to_be_returned);
    }

  }

};

module.exports = randomize_handlers;