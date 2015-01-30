module.exports = {
  <% _.each(scope.model.models,function(model){ %>
    <%= model.name.toLowerCase() %>: require('./<%= model.name %>'),
  <% })%>
};