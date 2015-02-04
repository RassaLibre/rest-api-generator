var express = require('express');
var routes = require('./app/routes');
var exp = express();
var bodyParser = require('body-parser')

exp.use(bodyParser.json());       // to support JSON-encoded bodies
exp.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

<%
_.each(scope.model.models, function(model){
  _.each(model.endpoints, function(endpoint){
%>
exp.<%=endpoint.type.toLowerCase()%>('/<%=endpoint.url%>',routes.<%=model.name.toLowerCase()%>.<%= scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id) %>);
<%
  })
})
%>

console.log('The application is listening at port 3001');
exp.listen(3001);