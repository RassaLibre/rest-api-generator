var mongo = require('mongodb');
var mongo_client = mongo.MongoClient;
var mongo_url = 'mongodb://xxx:xxx@ds033831.mongolab.com:33831/master-thesis';

var <%=model.name%>Controller = {

  <% _.each(model.endpoints, function(endpoint){ %>
    <% if(endpoint.type === "GET"){ %>
      <%=scope.set_GET_controller({model: model, endpoint: endpoint, scope: scope})%>
    <% } %>
    <% if(endpoint.type === "DELETE"){ %>
      <%=scope.set_DELETE_controller({model: model, endpoint: endpoint, scope: scope})%>
    <% }%>
    <% if(endpoint.type === "POST"){ %>
      <%=scope.set_POST_controller({model: model, endpoint: endpoint, scope: scope})%>
    <% }%>
    <% if(endpoint.type === "PUT"){ %>
      <%=scope.set_PUT_controller({model: model, endpoint: endpoint, scope: scope})%>
    <% }%>
  <% }) %>

};

module.exports = <%=model.name%>Controller;