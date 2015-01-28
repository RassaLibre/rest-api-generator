
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

<% if((endpoint.type === "PUT")&&(endpoint.url.match(/^\/?[a-z-_]+\/:[a-z_-]+\/[a-z-_]+\/:[a-z_-]+$/i))){ %>
<%
  var splited = endpoint.url.split('/');
  var url_param = _.last(splited);  // :parts_id
  var url_param_array = url_param.replace(':','').split('_'); //["parts","id"]
  var doc_param = url_param_array[0]; //parts
  var ident = url_param_array[1];     //id
%>
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
      collection.findOne({_id : mongo.ObjectID(id)}, function(err, doc){
        if(err) console.log(err);
        else console.log('found documents!');
        for(var i = 0; i < doc.<%=doc_param%>.length; i++){
          if(doc.<%=doc_param%>[i].<%=ident%> === req.params.<%=doc_param%>_<%=ident%>){
            for(var key in edited_<%=model.name%>){
              doc.<%=doc_param%>[i][key] = edited_<%=model.name%>[key];
            } 
            break;
          }
        }
        var query = {'<%=doc_param%>' : doc.<%=doc_param%>};
        collection.update({_id : mongo.ObjectID(id)},
          {$set:query},
          {safe:true, multi:false},
          function(err, result){
            if(err) console.log(err);
            else console.log('document edited!');
            res.send({"number_of_edited_rows" : result});
            db.close();
          }
        );

      });
    });  
  },

<% } %>