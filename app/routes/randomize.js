var config = require('../../config/config');
var _ = require('underscore');
var Metamodel = require('../metamodel');
var random_data_generator = require('../random_data_generator');
var mongo = require('mongodb');
var mongo_client = mongo.MongoClient;
var pluralize = require('pluralize');

var randomize_handlers = {
  /**
  * generates random data based on the model
  */
  mongodb: function(req, res){
    var model = req.body.model;
    var db = req.body.db.address;
    var to_be_returned = [];
    var metamodel = new Metamodel();
    if(metamodel.validate(model)){  //if the passed model is valid against metamodel
      mongo_client.connect(db, function(err, db){
        for(var i = 0; i < model.models.length; i++){
          var entity = model.models[i];
          //console.log(random_data_generator.generate_data);
          var random_data = random_data_generator.generate_data(entity, model);
          to_be_returned.push(random_data);
          //insert the data into the collection
          var collection = db.collection(pluralize.plural(model.models[i].name).toLowerCase());
          collection.insert(random_data, {}, function(err, result){});
        }
        res.send(to_be_returned);
      });
    }
  }
};

module.exports = randomize_handlers;