
<% if((endpoint.type === "DELETE")&&(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/?$/i))){ %>

  /**
  * deletes a part from the database
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
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
  },

<% } %>

<% if((endpoint.type === "DELETE")&&(endpoint.url.match(/^\/?[a-z-_]+\/?$/i))){ %>

  /**
  * deletes a part from the database
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) console.log(err);
      else console.log("Connected correctly to server");
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.remove({},
        {safe:true, multi:true},
        function(err, result){
          if(err) console.log(err);
          else console.log('documents deleted!');
          res.send({"number_of_deleted_rows" : result});
          db.close();
        }
      );
    });
  },

<% } %>

<% if((endpoint.type === "DELETE")&&(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+$/i))){ %>
<%
  var param = _.last(endpoint.url.split('/'))
%>

  /**
  * deletes a part from the database
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    var id = req.params.id;
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) console.log(err);
      else console.log("Connected correctly to server");
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.findOne({_id : mongo.ObjectID(req.params.id)}, function(err, doc){
        if(err) console.log(err);
        else console.log('found documents!');
        if( Object.prototype.toString.call(doc.<%=param%>) === '[object Array]' ) {
          doc.<%=param%> = [];
        }
        else doc.<%=param%> = {};
        var query = {'<%=param%>' : doc.<%=param%>};
        collection.update({_id : mongo.ObjectID(id)},
          {$set:query},
          {safe:true, multi:false},
          function(err, result){
            if(err) console.log(err);
            else console.log('document edited!');
            res.send({"number_of_edited_rows" : result});
            db.close();
          });        
      });
    });
  },

<% } %>