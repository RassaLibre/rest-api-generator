
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

  /**
  * returns one <%=scope.pluralize.plural(model.name)%> 
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
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

<% } %>


<% if((endpoint.type === "GET")&&(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+$/i))){ %>
<%
  var param = _.last(endpoint.url.split('/'))
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
        res.send(doc.<%=param%>);
        db.close();
      });
    });
  },

<% } %>


<% if((endpoint.type === "GET")&&(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+\/:[a-z_-]+$/i))){ %>
<%
  var splited = endpoint.url.split('/');
  var url_param = _.last(splited);  // :parts_id
  var url_param_array = url_param.replace(':','').split('_'); //["parts","id"]
  var doc_param = url_param_array[0]; //parts
  var ident = url_param_array[1];     //id
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
        for(var i = 0; i < doc.<%=doc_param%>.length; i++){
          if(doc.<%=doc_param%>[i].<%=ident%> === req.params.<%=doc_param%>_<%=ident%>){
            to_be_returned = doc.<%=doc_param%>[i];
            break;
          }
        }
        res.send(to_be_returned);
        db.close();
      });
    });
  },

<% } %>