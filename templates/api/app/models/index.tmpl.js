module.exports = {
  <% _.each(scope.model.models,function(model){ %>
    <%= model.name %>: require('./<%= model.name %>'),
  <% })%>
};