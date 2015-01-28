
<% if((endpoint.type === "PUT")&&(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/?$/i))){ %>

  /**
  * edit <%=model.name%>
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    var edited_<%=model.name%> = req.body;
    var id = req.params.id;
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) console.log(err);
      else console.log("Connected correctly to server");
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.update({_id : mongo.ObjectID(req.params.id)},
        {$set:edited_<%=model.name%>},
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

<% } %>