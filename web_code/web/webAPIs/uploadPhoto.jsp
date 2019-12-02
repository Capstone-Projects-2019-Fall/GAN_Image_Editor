<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@ page import = "java.io.*,java.util.*, javax.servlet.*" %>
<%@ page import = "javax.servlet.http.*" %>
<%@ page import = "org.apache.commons.fileupload.*" %>
<%@ page import = "org.apache.commons.fileupload.disk.*" %>
<%@ page import = "org.apache.commons.fileupload.servlet.*" %>
<%@ page import = "org.apache.commons.io.output.*" %>

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
   StringData loggedOnWebUser = (StringData) session.getAttribute("webUser");
   Gson gson = new Gson();
   DbConn dbc = new DbConn();
   StringDataImage errorMsgs = new StringDataImage();
   String jsonInsertData;
   File file ;
   int maxFileSize = 5000 * 1024;
   int maxMemSize = 5000 * 1024;
   ServletContext context = pageContext.getServletContext();
   String filePath = "/var/lib/tomcat7/webapps/FA19_3308_tud31981/pics/test/";

   // Verify the content type
   String contentType = request.getContentType();
   
   if ((contentType.indexOf("multipart/form-data") >= 0)) {
      DiskFileItemFactory factory = new DiskFileItemFactory();
      // maximum size that will be stored in memory
      factory.setSizeThreshold(maxMemSize);
      
      // Location to save data that is larger than maxMemSize.
      factory.setRepository(new File("/var/lib/tomcat7/webapps/FA19_3308_tud31981/pics/large/"));

      // Create a new file upload handler
      ServletFileUpload upload = new ServletFileUpload(factory);
      
      // maximum file size to be uploaded.
      upload.setSizeMax( maxFileSize );
      
      try { 
         // Parse the request to get file items.
         List fileItems = upload.parseRequest(request);

         // Process the uploaded file items
         Iterator i = fileItems.iterator();
/*
         out.println("<html>");
         out.println("<head>");
         out.println("<title>JSP File upload</title>");  
         out.println("</head>");
         out.println("<body>");
*/
         
         while ( i.hasNext () ) {
            FileItem fi = (FileItem)i.next();
            if ( !fi.isFormField () ) {
               // Get the uploaded file parameters
               String fieldName = fi.getFieldName();
               String fileName = fi.getName();
               boolean isInMemory = fi.isInMemory();
               long sizeInBytes = fi.getSize();
            
               
               // Write the file
               if( fileName.lastIndexOf("/") >= 0 ) {
                  file = new File( filePath + 
                  fileName.substring( fileName.lastIndexOf("/"))) ;
               } else {
                  file = new File( filePath + 
                  fileName.substring(fileName.lastIndexOf("/")+1)) ;
               }
               
               fi.write( file ) ;
               
               jsonInsertData = "{\"userId\": \"" + loggedOnWebUser.userId + "\", \"imagePath\": \"" + fileName + "\"}";
               System.out.println("insertData received and is " + jsonInsertData);
                errorMsgs.errorMsg = dbc.getErr();
                if (errorMsgs.errorMsg.length() == 0) { // means db connection is ok
                    System.out.println("DB connection OK to proceed");

                    // Must use gson to convert JSON (that the user provided as part of the url, the insertData. 
                    // Convert from JSON (JS object notation) to POJO (plain old java object).
                    StringDataImage insertData = gson.fromJson(jsonInsertData, StringDataImage.class);

                    // Validation - field by field, check what's in insertData and put error message (if any) 
                    // into corresponding field of errorMsgs.
                    errorMsgs.userId = ValidationUtils.integerValidationMsg(insertData.userId, true);
                    errorMsgs.imagePath = ValidationUtils.stringValidationMsg(insertData.imagePath, 45, true);


                    if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
                        errorMsgs.errorMsg = "Please try again";

                    } else { // all fields passed validation

                        // Start preparing SQL statement
                        String sql = "INSERT INTO image_table (user_id, image_path) "
                             + "values (?,?)";

                        // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
                        // Only difference is that Sally's class takes care of encoding null 
                        // when necessary. And it also System.out.prints exception error messages.
                        PrepStatement pStatement = new PrepStatement(dbc, sql);

                        // Encode string values into the prepared statement (wrapper class).
                        pStatement.setInt(1, ValidationUtils.integerConversion(insertData.userId));
                        pStatement.setString(2, insertData.imagePath); // string type is simple

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

                }
                
                //out.print(gson.toJson(errorMsgs).trim());
                dbc.close();
               
               //out.println("Uploaded Filename: " + filePath + 
               //fileName + "<br>");
            }
         }
         out.println("Successful upload!");
         //out.println(errorMsgs);
         //out.println("</body>");
         //out.println("</html>");
      } catch(Exception ex) {
         System.out.println(ex);
         out.println(ex);
      }
   } else {
      out.println("<html>");
      out.println("<head>");
      out.println("<title>Servlet upload</title>");  
      out.println("</head>");
      out.println("<body>");
      out.println("<p>No file uploaded</p>"); 
      out.println("</body>");
      out.println("</html>");
   }
%>