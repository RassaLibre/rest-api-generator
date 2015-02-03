var express = require('express');
var routes = require('./app/routes');
var exp = express();
var bodyParser = require('body-parser')

exp.use(bodyParser.json());       // to support JSON-encoded bodies
exp.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


exp.get('/', function(req, res){res.send('hello world');});
exp.get('/parts',routes.parts.getParts);
exp.get('/parts/:id',routes.parts.getPart);
exp.post('/parts',routes.parts.addPart);
exp.put('/parts/:id',routes.parts.editPart);
exp.delete('/parts/:id',routes.parts.deletePart);


console.log('The application is listening at port 3000');
exp.listen(3000);