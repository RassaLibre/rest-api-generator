
<%
  //if the endpoint matches for example "ovens" or "parts"
  if(endpoint.url.match(/^\/?[a-z-_]+\/?$/i)){
%>

  /**
  * returns list of <%=scope.pluralize.plural(model.name)%>
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) error_handler.send_error(res, 102);
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.find({}).toArray(function(err, docs){
        if(err) error_handler.send_error(res, 100);
        res.send(docs);
        db.close();
      });
    });
  },  

<% } %>

<%
  //if the endpoint matches for example "ovens/:id"
  if(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/?$/i)){
%>
<%
  //parse the url and get the parameter name
  var parsed_url = scope.split_url(endpoint.url);
  var param = parsed_url[1]; //if the URI is "ovens/:id" this one will be "id"
  var query = scope.query_selector({ident: param});
%>
  /**
  * returns one <%=model.name%>  
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) error_handler.send_error(res, 102);
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.findOne(<%=query%>, function(err, doc){
        if(err) error_handler.send_error(res, 100);
        if(doc) res.send(doc);
        else error_handler.send_error(res, 100);
        db.close();
      });
    });
  },

<% } %>


<%
  //if the endpoint matches for example "ovens/:id/parts" and "parts"
  //is a valid property of the model
  if((endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+$/i))&&
     (scope.is_valid_prop_name(model.properties, _.last(endpoint.url.split('/'))))){
%>
<%
  //parse the url and get the parameter name
  var parsed_url = scope.split_url(endpoint.url);
  var resource_ident = parsed_url[1];  //id
  var param_name = parsed_url[2]; //parts
  var query = scope.query_selector({ident: resource_ident});
%>
  /**
  * returns param from <%=model.name%> 
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) error_handler.send_error(res, 102);
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.findOne(<%=query%>, function(err, doc){
        if(err) error_handler.send_error(res, 100);
        if(doc) res.send(doc.<%=param_name%>);
        else error_handler.send_error(res, 100);
        db.close();
      });
    });
  },

<% } %>

<%
  //if the endpoint matches for example "ovens/:id/parts" and "parts"
  //is NOT a valid property of the model
  if((endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+$/i))&&
     (!scope.is_valid_prop_name(model.properties, _.last(endpoint.url.split('/'))))){
%>

  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    res.status(500).send("Not implemented");
  },

<% } %>



<%
  //if the endpoint matches for example "ovens/:id/parts/:parts_id"
  if((endpoint.type === "GET")&&(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+\/:[a-z_-]+$/i))){
%>

<%
  //parse the url and get the parameter name
  var parsed_url = scope.split_url(endpoint.url);
  var resource_ident = parsed_url[1];  //id
  var param_name = parsed_url[2]; //parts
  var param_ident = parsed_url[3]; //parts_id
  var query = scope.query_selector({ident: resource_ident});
%>
  /**
  *
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) error_handler.send_error(res, 102);
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.findOne(<%=query%>, function(err, doc){
        if((err)||(!doc)){
          error_handler.send_error(res, 100);
          return;
        }
        var to_be_returned = nested.get_nested('_<%=param_ident.split('_')[1]%>', req.params.<%=param_ident%>, '<%=param_name%>', doc);
        res.send(to_be_returned);
        db.close();
      });
    });
  },

<% } %>