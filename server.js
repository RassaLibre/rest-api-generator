var express = require('express');
var routes = require('./app/routes');
var exp = express();
var bodyParser = require('body-parser');

exp.use(bodyParser.json());         // to support JSON-encoded bodies
exp.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

exp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

exp.use(express.static(__dirname + '/compressed'));

exp.get('/', function(req, res){
  res.send('REST API generator');
});

/**
* endpoint for generating a NodeJS server
*/
exp.post('/generate/nodejs',routes.generate.nodejs);

/**
* endpoint for generating a NodeJS server and pushing it to GitHub
*/
exp.post('/github/nodejs', routes.github.nodejs);

/**
* generate random data and store them into the collections
*/
exp.post('/randomize/mongodb', routes.randomize.mongodb);


exp.post('/github-to-github',routes.github_to_github.nodejs);
exp.post('/github-to-zip',routes.github_to_zip.nodejs);
exp.post('/folder-to-github',routes.folder_to_github.nodejs);
exp.post('/folder-to-zip',routes.folder_to_zip.nodejs);


console.log('The application is listening at port 3000');
exp.listen(3000);
