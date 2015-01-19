var express = require('express');
var routes = require('./app/routes');
var exp = express();

exp.get('/', routes.generate);

console.log('The application is listening at port 3000');
exp.listen(3000);