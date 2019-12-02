package model.webUser;

import dbUtils.DbConn;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {

    public static StringDataList findById (DbConn dbc, String id) {
        
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT user_id, user_email, user_password " +
                    "FROM user_table " +   
                    "WHERE user_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first 
            // (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in WebUserView.getUserById(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;

    } // getUserById
    
    public static StringData logonFind(String email, String pw, DbConn dbc) {
            StringData foundData = new StringData();
            if ((email == null) || (pw == null)) {
                foundData.errorMsg = "Programmer error in model.webUser.DbMods.logonFind: email and pw must be both non-null.";
                return foundData;
            }
            try {
                String sql = "SELECT user_id, user_email, user_password " +
                            "FROM user_table " +
                            "WHERE user_email = ? AND user_password = ? ";
                PreparedStatement pStatement = dbc.getConn().prepareStatement(sql); // this compiles the SQL

                // Encode user supplied values into the ?s of the prepared statement.
                pStatement.setString(1, email); // replace 1st question mark
                pStatement.setString(2, pw);    // replace 2nd question mark

                System.out.println("EMAIL: " + email + " PW: " + pw);
                
                ResultSet results = pStatement.executeQuery();  // Get the result set - expecting 1 or 0 records, 
                                                                // because user_email must be unique within the table.
                if (results.next()) {
                    // Record found in database, credentials are good.
                    return new StringData(results);
                } else {
                    // Returning null means that the username / pw were not found in the database
                    return null;
                }
            } catch (Exception e) {
                foundData.errorMsg = "Exception in model.webUser.DbMods.logonFind(): " + e.getMessage();
                System.out.println("******" + foundData.errorMsg);
                return foundData;
            }
    } // logonFind
    
    public static String deleteImage(String imageId, DbConn dbc) {

        if (imageId == null) {
            return "Error in model.webUser.DbMods.deleteImage: cannot delete image record because 'imageId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM image_table WHERE image_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, imageId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with image_id " + imageId;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.webUser.DbMods.deleteImage(): " + e.getMessage();
        }

        return result;
    }
    
} // class
