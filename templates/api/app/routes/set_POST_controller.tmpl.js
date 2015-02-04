
<%
  //if the URI is matching the pattern "ovens"
  if(endpoint.url.match(/^\/?[a-z-_]+\/?$/i)){
%>

  /**
  * adds <%=model.name%> to the database
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    var new_<%=model.name%> = new model.<%=scope.capitalise_first_leter(model.name)%>();
    new_<%=model.name%>.assign(req.body);
    if(!new_<%=model.name%>.is_valid()){
      error_handler.send_error(res, 103);
      return;
    }
    console.log(new_<%=model.name%>.to_JSON());
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) error_handler.send_error(res, 102);
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.insert(new_<%=model.name%>.to_JSON(), {}, function(err, result){
        if(err) error_handler.send_error(res, 100);
        res.send(new_<%=model.name%>.to_public(result));
        db.close();
      });
    });
  },

<% } %>

<%
//if the url is matching the pattern "ovens/:id/parts"
if(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+$/i)){
%>
<%
  //parsing the url
  var parsed_url = scope.split_url(endpoint.url);
  var url_param = parsed_url[2];  // parts
  var resource_ident = parsed_url[1].replace(':','');
  var query = scope.query_selector({ident: resource_ident});
%>

  /**
  *
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    var new_<%=model.name%> = new model.<%=scope.capitalise_first_leter(scope.pluralize.singular(url_param))%>();
    new_<%=model.name%>.assign(req.body);
    if(!new_<%=model.name%>.is_valid()){
      error_handler.send_error(res, 103);
      return;
    }
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) error_handler.send_error(res, 102);
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.update({_id : mongo.ObjectID(req.params.id)},
        { $addToSet: { <%=url_param%>: new_<%=model.name%>.to_JSON() } }, function(err, result){
        if(err) error_handler.send_error(res, 100);
        res.send(new_<%=model.name%>.to_public(result));
        db.close();
      });
    });
  },

<% } %>