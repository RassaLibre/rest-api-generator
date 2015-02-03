
<%
  //if the url matches "oven"
  if(endpoint.url.match(/^\/?[a-z-_]+\/?$/i)){
%>
  /**
  * deletes a <%=model.name%> from the database
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) error_handler.send_error(res, 102);
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.remove({},
        {safe:true, multi:true},
        function(err, result){
          if(err) error_handler.send_error(res, 100);
          res.send({"number_of_deleted_rows" : result});
          db.close();
        }
      );
    });
  }

<% } %>


<%
  //if the url matches "ovens/:id" pattern
  if(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/?$/i)){
%>
<%
  //parse the url and get the parameter name
  var parsed_url = scope.split_url(endpoint.url);
  var param = parsed_url[1]; //if the URI is "ovens/:id" this one will be "id"
  var query = scope.query_selector({ident: param});
%>
  /**
  * deletes a <%=model.name%> from the database
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) error_handler.send_error(res, 102);
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.remove(<%=query%>,
        {safe:true, multi:false},
        function(err, result){
          if(err) error_handler.send_error(res, 100);
          res.send({"number_of_deleted_rows" : result});
          db.close();
        }
      );
    });
  }

<% } %>

<%
  //if the url matches "ovens/:id/parts" pattern
  if(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+$/i)){
%>
<%
  //parse the url and get the parameter name
  var parsed_url = scope.split_url(endpoint.url);
  var param = parsed_url[1]; //if the URI is "ovens/:id" this one will be "id"
  var param_name = parsed_url[2]; //parts
  var query = scope.query_selector({ident: param});
%>

  /**
  * deletes a part from the database
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) error_handler.send_error(res, 102);
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.findOne(<%=query%>, function(err, doc){
        if(err) error_handler.send_error(res, 100);
        if( Object.prototype.toString.call(doc.<%=param%>) === '[object Array]' ) {
          doc.<%=param_name%> = [];
        }
        else doc.<%=param_name%> = {};
        var query = {'<%=param_name%>' : doc.<%=param_name%>};
        collection.update(<%=query%>,
          {$set:query},
          {safe:true, multi:false},
          function(err, result){
            if(err) error_handler.send_error(res, 100);
            res.send({"number_of_edited_rows" : result});
            db.close();
          });        
      });
    });
  },

<% } %>

<%
  //if the url matches "ovens/:id/parts/:parts_id"
  if(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+\/:[a-z_-]+$/i)){
%>
<%
  var parsed_url = scope.split_url(endpoint.url);
  var resource_ident = parsed_url[1]; //id 
  var url_param = parsed_url[2];  //parts
  var url_param_value = parsed_url[3]; //parts_id
  var query = scope.query_selector({ident: resource_ident});
%>

  /**
  * deletes a part from the database
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) console.log(err);
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.findOne({_id : mongo.ObjectID(req.params.id)}, function(err, doc){
        if(err) console.log(err);
        doc = nested.remove_nested(req.params.<%url_param_value%>, '<%=url_param_value.split('_')[0]%>', doc);
        var query = {'<%=url_param%>' : doc.<%=url_param%>};
        collection.update(<%=query%>,
          {$set:query},
          {safe:true, multi:false},
          function(err, result){
            if(err) console.log(err);
            res.send({"number_of_deleted_rows" : result});
            db.close();
          });        
      });
    });
  },

<% } %>