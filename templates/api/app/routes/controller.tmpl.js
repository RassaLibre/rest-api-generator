var error_handler = require('../Error_Map');
var mongo = require('mongodb');
var mongo_client = mongo.MongoClient;
var mongo_url = require('../Db')();
var model = require('../models');
var nested = require('../nested');

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

module.exports = partsController;