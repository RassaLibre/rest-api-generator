
<%
//if the url matches "ovens/:id"
if(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/?$/i)){
%>

  <%
  //parse the url and get the parameter name
  var parsed_url = scope.split_url(endpoint.url);
  var resource_ident = parsed_url[1];
  var query = scope.query_selector({ident: resource_ident});
  %>
  /**
  * edit <%=model.name%>
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    var new_<%=model.name%> = new model.<%=scope.capitalise_first_leter(model.name)%>();
    new_<%=model.name%>.assign(req.body);
    if(!new_<%=model.name%>.is_valid()){
      error_handler.send_error(res, 103);
      return;
    }
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) error_handler.send_error(res, 102);
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.update(<%=query%>,
        {$set:new_<%=model.name%>.to_JSON()},
        {safe:true, multi:false},
        function(err, result){
          if(err) error_handler.send_error(res, 100);
          res.send({"number_of_edited_rows" : result});
          db.close();
        }
      );
    });  
  },

<% } %>

<%
//if the url matches "ovens/:id/parts/:parts_id"
if(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+\/:[a-z_-]+$/i)){
%>
<%
  var parsed_url = scope.split_url(endpoint.url);
  var resource_ident = parsed_url[1]; //id from ovens
  var url_param = parsed_url[2];  //parts from url
  var url_param_value = parsed_url[3];
  var query = scope.query_selector({ident: resource_ident});
%>
  /**
  * edit <%=url_param%> in <%=model.name%>
  */
  <%=scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id)%>: function(req, res){
    var edited_<%=model.name%> = new model.<%=scope.capitalise_first_leter(scope.pluralize.singular(url_param))%>();
    edited_<%=model.name%>.assign(req.body);
    if(!edited_<%=model.name%>.is_valid()){
      error_handler.send_error(res, 103);
      return;
    }
    mongo_client.connect(mongo_url, function(err, db) {
      if(err) error_handler.send_error(res, 102);
      var collection = db.collection('<%=scope.pluralize.plural(model.name).toLowerCase()%>');
      collection.findOne(<%=query%>, function(err, doc){
        if(err) error_handler.send_error(res, 100);
        doc = nested.update_nested(edited_<%=model.name%>.to_JSON(), req.params.<%=url_param_value%>, '<%=url_param%>', doc, "_<%=url_param_value.split('_')[1]%>");
        var query = {'<%=url_param%>' : doc.<%=url_param%>};
        collection.update(<%=query%>,
          {$set:query},
          {safe:true, multi:false},
          function(err, result){
            if(err) error_handler.send_error(res, 100);
            res.send({"number_of_edited_rows" : result});
            db.close();
          }
        );

      });
    });  
  },


<% } %>