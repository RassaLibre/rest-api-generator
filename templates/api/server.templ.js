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
exp.<%=endpoint.type.toLowerCase()%>('<%=endpoint.url%>',routes.parts.<%= scope.get_controller_name(endpoint.url, endpoint.type, endpoint.id) %>);

<%
  })
})
%>
/**
exp.get('/', function(req, res){res.send('hello world');});
exp.get('/parts',routes.parts.getParts);
exp.get('/parts/:id',routes.parts.getPart);
exp.post('/parts',routes.parts.addPart);
exp.put('/parts/:id',routes.parts.editPart);
exp.delete('/parts/:id',routes.parts.deletePart);
**/

console.log('The application is listening at port 3000');
exp.listen(3000);