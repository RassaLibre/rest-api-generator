
<% if((endpoint.type === "POST")&&(endpoint.url.match(/^\/?[a-z-_]+\/?$/i))){ %>

  /**
  * adds part to the database
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    var new_<%=model.name%> = req.body;
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) console.log(err);
      else console.log("Connected correctly to server");
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.insert(new_<%=model.name%>, {}, function(err, result){
        if(err) console.log(err);
        else console.log('document created!');
        res.send(result);
        db.close();
      });
    });
  },

<% } %>

<% if((endpoint.type === "POST")&&(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+$/i))){ %>
<%
  var splited = endpoint.url.split('/');
  var url_param = _.last(splited);  // parts
%>
  /**
  * adds part to the database
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    var new_<%=model.name%> = req.body;
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) console.log(err);
      else console.log("Connected correctly to server");
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.update({_id : mongo.ObjectID(req.params.id)},
        { $addToSet: { <%=url_param%>: new_<%=model.name%> } }, function(err, result){
          if(err) console.log(err);
          else console.log('document created!');
          res.send(result);
          db.close();
      });
    });
  },

<% } %>