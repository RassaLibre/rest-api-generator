/**
* configuration object for connecting to the database
* @type {Object}
*/
var config = {
  "protocol" : "mongodb://",
  "server" : "@ds033831.mongolab.com",
  "user" : "admin",
  "password" : "admin",
  "port" : "33831",
  "db_name" : "master-thesis"
};

/**
* returns the address of the mongoDB
* @return {String}
*/
construct_address = function(){
  return config.protocol+config.user+":"+config.password+config.server+":"+
    config.port+"/"+config.db_name;
};

module.exports = construct_address;
