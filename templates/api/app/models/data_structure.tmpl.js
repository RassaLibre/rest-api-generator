var Model = require('./model');
var _ = require('underscore');

/**
* instantiate the model
*/
<%=model.name%>.prototype = new Model();
<%=model.name%>.prototype.constructor = <%=model.name%>;
function <%=model.name%>(){

  /**
  * set the fields
  */
  this.fields = {
<% _.each(model.properties, function(property){ %>
  <%=property.name%> : {
    type: '<%=property.type.type%>',
    <% var keys = _.keys(property.type);
      _.each(keys, function(key){
        if(key === "type") return; %><%=key%> : <%=scope.field_properties({key: key, value: property.type[key]})%>,<% }) %>
  },
<% })%>
  };
};


module.exports = <%=model.name%>;