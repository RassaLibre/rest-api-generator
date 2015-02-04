var express = require('express');
var routes = require('./app/routes');
var exp = express();
var bodyParser = require('body-parser');

exp.use(bodyParser.json());         // to support JSON-encoded bodies
exp.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

exp.get('/', function(req, res){
  res.send('REST API generator');
});

/**
* endpoint for generating a NodeJS server
*/
exp.post('/generate/nodejs',routes.generate.nodejs);

/**
* endpoint for generating a Golang server
*/
exp.post('/generate/golang', routes.generate.golang);

/**
* endpoint for generating a NodeJS server and pushing it to GitHub
*/
exp.post('/github/nodejs', routes.github.nodejs);


console.log('The application is listening at port 3000');
exp.listen(3000);