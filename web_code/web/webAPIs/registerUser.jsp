<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %>
<%@page language="java" import="com.google.gson.*" %>

<%

    // This is the object we get from the GSON library.
    // This object knows how to convert betweeb these two formats: 
    //    POJO (plain old java object) 
    //    JSON (JavaScript Object notation)
    Gson gson = new Gson();

    DbConn dbc = new DbConn();
    StringData errorMsgs = new StringData();

    String jsonInsertData = request.getParameter("jsonData");

    if (jsonInsertData == null) {
        errorMsgs.errorMsg = "Cannot insert -- no data was received";
        System.out.println(errorMsgs.errorMsg);
    } else { // URL parameter data was received
        System.out.println("insertData received and is " + jsonInsertData);
        errorMsgs.errorMsg = dbc.getErr();
        if (errorMsgs.errorMsg.length() == 0) { // means db connection is ok
            System.out.println("DB connection OK to proceed");

            // Must use gson to convert JSON (that the user provided as part of the url, the insertData. 
            // Convert from JSON (JS object notation) to POJO (plain old java object).
            StringData insertData = gson.fromJson(jsonInsertData, StringData.class);

            /* Useful to copy field names from StringData as a reference
    public String webUserId = "";
    public String userEmail = "";
    public String userPassword = "";
    public String userPassword2 = "";
    public String birthday = "";
    public String membershipFee = "";
    public String userRoleId = "";   // Foreign Key
    public String userRoleType = ""; // getting it from joined user_role table.
             */
            // Validation - field by field, check what's in insertData and put error message (if any) 
            // into corresponding field of errorMsgs.
            errorMsgs.userEmail = ValidationUtils.stringValidationMsg(insertData.userEmail, 45, true);
            errorMsgs.userPassword = ValidationUtils.stringValidationMsg(insertData.userPassword, 45, true);

            if (insertData.userPassword.compareTo(insertData.userPassword2) != 0) { // case sensative comparison
                errorMsgs.userPassword2 = "Both passwords must match";
            }

            if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
                errorMsgs.errorMsg = "Please try again";

            } else { // all fields passed validation

                // Start preparing SQL statement
                String sql = "INSERT INTO user_table (user_email, user_password) "
                        + "values (?,?)";

                // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
                // Only difference is that Sally's class takes care of encoding null 
                // when necessary. And it also System.out.prints exception error messages.
                PrepStatement pStatement = new PrepStatement(dbc, sql);

                // Encode string values into the prepared statement (wrapper class).
                pStatement.setString(1, insertData.userEmail); // string type is simple
                pStatement.setString(2, insertData.userPassword);

                // here the SQL statement is actually executed
                int numRows = pStatement.executeUpdate();

                // This will return empty string if all went well, else all error messages.
                errorMsgs.errorMsg = pStatement.getErrorMsg();
                if (errorMsgs.errorMsg.length() == 0) {
                    if (numRows == 1) {
                        errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                    } else {
                        // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                        errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                    }
                } else if (errorMsgs.errorMsg.contains("foreign key")) {
                    errorMsgs.errorMsg = "Invalid User Role Id";
                } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                    errorMsgs.errorMsg = "That email address is already taken";
                }

            } // all fields passed validation

        } // db connection OK
    } // URL parameter data was received.

    out.print(gson.toJson(errorMsgs).trim());
    dbc.close();
%>

