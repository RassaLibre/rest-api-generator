<% if(ident === "id"){ %>
{_id : mongo.ObjectID(req.params.id)}
<% } %>
<% if(ident !== "id"){ %>
{<%=ident%> : req.params.<%=ident%>}
<% } %>