package model.webUser;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringDataImage {

    public String userId = "";
    public String imageId = "";
    public String imagePath = "";

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringDataImage() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringDataImage(ResultSet results) {
        try {
            this.userId = FormatUtils.formatInteger(results.getObject("user_id"));
            this.imageId = FormatUtils.formatInteger(results.getObject("image_id"));
            this.imagePath = FormatUtils.formatString(results.getObject("image_path"));
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.webUser.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s = this.userId + this.imageId + this.imagePath;
        return s.length();
    }

    public String toString() {
        return "Web User Id:" + this.userId
                + ", Image Id: " + this.imageId
                + ", Image Path: " + this.imagePath;
    }
}
