
<% if((endpoint.type === "GET")&&(endpoint.url.match(/^\/?[a-z-_]+\/?$/i))){ %>

  /**
  * returns list of <%=scope.pluralize.plural(model.name)%>
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
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

<% } %>

<% if((endpoint.type === "GET")&&(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/?$/i))){ %>
<%
  var parsed_url = scope.split_url(endpoint.url);
  var param = parsed_url[1];
%>
  /**
  * returns one <%=scope.pluralize.plural(model.name)%> 
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) console.log(err);
      else console.log("Connected correctly to server");
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.findOne({_id : mongo.ObjectID(req.params.<%=param%>)}, function(err, doc){
        if(err) console.log(err);
        else console.log('found documents!');
        res.send(doc);
        db.close();
      });
    });
  },

<% } %>


<% if((endpoint.type === "GET")&&(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+$/i))){ %>
<%
  var parsed_url = scope.split_url(endpoint.url);
  var resource_ident = parsed_url[1];  //id
  var param_name = parsed_url[2];
%>
  /**
  * returns one part 
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) console.log(err);
      else console.log("Connected correctly to server");
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.findOne({_id : mongo.ObjectID(req.params.<%=resource_ident%>)}, function(err, doc){
        if(err) console.log(err);
        else console.log('found documents!');
        res.send(doc.<%=param_name%>);
        db.close();
      });
    });
  },

<% } %>


<% if((endpoint.type === "GET")&&(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+\/:[a-z_-]+$/i))){ %>

<%
  var parsed_url = scope.split_url(endpoint.url);
  var resource_ident = parsed_url[1];  //id
  var param_name = parsed_url[2]; //parts
  var param_ident = parsed_url[3]; //parts_id
%>
  /**
  * returns one part 
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) console.log(err);
      else console.log("Connected correctly to server");
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.findOne({_id : mongo.ObjectID(req.params.id)}, function(err, doc){
        if(err) console.log(err);
        else console.log('found documents!');
        var to_be_returned;
        for(var i = 0; i < doc.<%=param_name%>.length; i++){
          if(doc.<%=param_name%>[i].<%=resource_ident%> === req.params.<%=param_name%>_<%=resource_ident%>){
            to_be_returned = doc.<%=param_name%>[i];
            break;
          }
        }
        res.send(to_be_returned);
        db.close();
      });
    });
  },

<% } %>