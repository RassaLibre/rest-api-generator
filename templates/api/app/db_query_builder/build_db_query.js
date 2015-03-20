var _ = require('underscore');

/**
* The function takes the query object from the req object and parses it
* based on the passed model into a valid MongoDb query
* @param {Object} query_string
* @param {Object} model_props
* @return {Object}
*/
module.exports = function(query_string, model_props){
  var query = {};
  var orderBy = {};

  var filter_keys = _.keys(query_string);
  var properties = _.keys(model_props);

  //because we need to find out which of the query string filter are in the model
  //so we they can be considered as a filter
  for(var i = 0; i < filter_keys.length; i++){
    if(properties.indexOf(filter_keys[i]) !== -1){
      query[filter_keys[i]] = query_string[filter_keys[i]];
      //if the type is integer, it is neccessary to change the type to integer
      //because all values in the query_string are parsed as strings
      if(model_props[filter_keys[i]].type === 'integer'){
        query[filter_keys[i]] = Number(query[filter_keys[i]]);
      }
      //if it is a string, set it up as a regex so one can also do partial
      //filtering
      if(model_props[filter_keys[i]].type === 'string'){
        var regexp = new RegExp(query_string[filter_keys[i]],'i');
        query[filter_keys[i]] = {$regex : regexp};
      }
      //if it is a timestamp, we want to filter the rows based on the first
      //characted of the timestamp which can be < or >
      if(model_props[filter_keys[i]].type === 'timestamp'){
        var mark = query_string[filter_keys[i]].charAt(0); //< or >
        if(mark === '<'){
          query[filter_keys[i]] =
            {$lt: Number(query_string[filter_keys[i]].substring(1,query_string[filter_keys[i]].length))};
        }else{
          query[filter_keys[i]] =
            {$gt: Number(query_string[filter_keys[i]].substring(1,query_string[filter_keys[i]].length))};
        }
      }

    }
  }


  if(query_string.orderBy){ //if there is a orderBy in the URL, build it
    orderBy[query_string.orderBy] =
      (query_string.orderDirection == 'desc') ? -1 : 1;
  }
  return {$query: query, $orderby: orderBy};
};
