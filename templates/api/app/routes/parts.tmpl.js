var mongo = require('mongodb');
var mongo_client = mongo.MongoClient;
var mongo_url = 'mongodb://xxx:xxx@ds033831.mongolab.com:33831/master-thesis';

var <%=model.name%>Controller = {

  /**
  * returns list of parts
  */
  get<%=scope.pluralize.plural(model.name)%>: function(req, res){
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) console.log(err);
      else console.log("Connected correctly to server");
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.find({}).toArray(function(err, docs){
        if(err) console.log(err);
        else console.log('found documents!');
        res.send(docs);
        db.close();
      });
    });
  },
  
  /**
  * returns one part 
  */
  get<%=model.name%>: function(req, res){
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) console.log(err);
      else console.log("Connected correctly to server");
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.findOne({_id : mongo.ObjectID(req.params.id)}, function(err, doc){
        if(err) console.log(err);
        else console.log('found documents!');
        res.send(doc);
        db.close();
      });
    });
  },
  
  /**
  * adds part to the database
  */
  add<%=model.name%>: function(req, res){
    var new_part = req.body;
    console.log(new_part);
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) console.log(err);
      else console.log("Connected correctly to server");
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.insert(new_part, {}, function(err, result){
        if(err) console.log(err);
        else console.log('document created!');
        res.send(result);
        db.close();
      });
    });
  },

  /**
  * edit part
  */
  edit<%=model.name%>: function(req, res){
    var edited_part = req.body;
    var id = req.params.id;
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) console.log(err);
      else console.log("Connected correctly to server");
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.update({_id : mongo.ObjectID(req.params.id)},
        {$set:edited_part},
        {safe:true, multi:false},
        function(err, result){
          if(err) console.log(err);
          else console.log('document edited!');
          res.send({"number_of_edited_rows" : result});
          db.close();
        }
      );
    });  
  },

  /**
  * deletes a part from the database
  */
  delete<%=model.name%>: function(req, res){
    var id = req.params.id;
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) console.log(err);
      else console.log("Connected correctly to server");
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.remove({_id : mongo.ObjectID(req.params.id)},
        {safe:true, multi:false},
        function(err, result){
          if(err) console.log(err);
          else console.log('document deleted!');
          res.send({"number_of_deleted_rows" : result});
          db.close();
        }
      );
    });
  }

};

module.exports = <%=model.name%>Controller;