<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringDataImage img = new StringDataImage();
    StringData loggedOnWebUser = (StringData) session.getAttribute("webUser"); 
    
    //TODO: loggedOnWbUser

    String fileName = request.getParameter("fileName");
    if (fileName == null) {
        img.errorMsg = "Cannot search for file - 'fileName' must be supplied";
    } else {
        System.out.println("*** Ready to call getImageByName");
        img = WebUserView.getImageByName(loggedOnWebUser, fileName);
    }

    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(img).trim());
%>