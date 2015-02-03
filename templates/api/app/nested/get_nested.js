/**
*    returns a nested object in an nested array
*    @param {String} search_param which param in nested array will be matched
*    @param {string} search_param_value which value are we looking for?
*    @param {object} nested array name
*    @param {object} data 
*    @return {object}
*/
module.exports = function(search_param, search_param_value, nested, data){
  var nested = data[nested];
  if(nested){
    for(var i = 0; i < nested.length; i++){
      if(nested[i][search_param] === search_param_value){
        return nested[i];
      }
    }
  }
  else return null;
}