<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@ page import = "java.io.*,java.util.*, javax.servlet.*" %>

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    // default constructor creates StringData Object with all fields "" (empty string, no nulls)
    StringDataImage sd = new StringDataImage(); // we really only need the errorMsg property of object sd... 

    DbConn dbc = new DbConn();
    sd.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

    String idToDelete = request.getParameter("deleteId");
    if (idToDelete == null) {
        sd.errorMsg = "Cannot delete - need parameter 'deleteId'";
    } else {

        if (sd.errorMsg.length() == 0) { // if got good DB connection,

            System.out.println("*** Ready to call delete method");
            sd.errorMsg = DbMods.deleteImage(idToDelete, dbc);
        }
    }
    dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
    
    if(sd.errorMsg.length() == 0){
        File file = new File("/var/lib/tomcat7/webapps/FA19_3308_tud31981/pics/test/" + idToDelete); 
          
        if(file.delete()) 
        { 
            ;
        } 
        else
        { 
            sd.errorMsg = "Failed to delete the file"; 
        } 
        
    }

    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(sd));
%>