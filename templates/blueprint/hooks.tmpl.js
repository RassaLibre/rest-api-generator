var hook = require('hooks');

/**
* Array of IDs of newly created records in the database
* @type {Array}
*/
var created_ids = {};

<% _.each(scope.model.models, function(model){ %>
  <%  _.each(model.endpoints, function(endpoint){ %>
      <% if(endpoint.type === 'POST'){ %>
/**
* save the new objects ID to the variable so it can be then replaced
* <%=scope.get_natural_language_for_endpoint(endpoint)%>
*/
hook.after('<%=model.name%> > endpoint > <%=scope.get_natural_language_for_endpoint(endpoint)%>',function(transaction){
  var response = JSON.parse(transaction.real.body);
  var new_id = response._id;  //get the new ID of the created oven
  var splited_url = transaction.id.split(' ')[1];
  created_ids[splited_url] = new_id;
  console.log(created_ids);

});
      <% } %>
  <% }) %>
<% }) %>



hook.before('Oven > endpoint > get whatever',function(transaction){
  var current_uri = transaction.request.uri;
  var splited = current_uri.split('/');
  transaction.fullPath = '/'+splited[1]+'/'+ created_ids['/'+splited[1]];
  console.log(transaction);
});
