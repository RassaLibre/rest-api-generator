var express = require('express');
var routes = require('./app/routes');
var exp = express();

exp.get('/', function(req, res){
  res.send('REST API generator');
});
exp.get('/generate/nodejs',routes.generate.nodejs);
exp.get('/generate/golang', routes.generate.golang);


console.log('The application is listening at port 3000');
exp.listen(3000);