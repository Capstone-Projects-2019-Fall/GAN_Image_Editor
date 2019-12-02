<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringData userInfo = new StringData();

    String searchEmail = request.getParameter("email");
    String searchPw = request.getParameter("pw");
    if (searchEmail == null || searchPw == null) {
        userInfo.errorMsg = "Cannot search for user - 'email' and 'pw' must be supplied";
    } else {

        DbConn dbc = new DbConn();
        userInfo.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

        if (userInfo.errorMsg.length() == 0) { // if got good DB connection,

            System.out.println("*** Ready to call logonFindAPI");
            userInfo = DbMods.logonFind(searchEmail, searchPw, dbc);
            
            if(userInfo == null){
                out.println("User not found");
            }
            else{
                session.setAttribute("webUser", userInfo); // make up whatever name you want for 2nd parameter
            }
        }

        dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
        
    }
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(userInfo).trim());
%>