<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData loggedOnWebUser = (StringData) session.getAttribute("webUser"); 
    StringDataList list = new StringDataList();
    Gson gson = new Gson();

    if(loggedOnWebUser == null){
        out.print("No user logged in.");
    }
    else{
        list.add(loggedOnWebUser);
        out.print(gson.toJson(list).trim());
    }
%>