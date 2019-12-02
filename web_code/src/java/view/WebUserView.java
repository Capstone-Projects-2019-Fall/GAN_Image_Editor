package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.webUser.*;

// classes in my project
import dbUtils.*;

public class WebUserView {

    public static StringDataList getAllUsers(DbConn dbc) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT user_id, user_email, user_password " +
                    "FROM user_table " + 
                    "ORDER BY user_id ";  
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in WebUserView.allUsersAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
    
    public static StringDataListImage getWebUserImages(DbConn dbc, StringData user) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataListImage sdl = new StringDataListImage();
        try {
            String sql = "SELECT image_id, image_path, user_id " +
                    "FROM image_table " + 
                    "WHERE user_id = ?" +
                    "ORDER BY image_id ";  
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, user.userId);
            
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringDataImage sd = new StringDataImage();
            sd.errorMsg = "Exception thrown in WebUserView.getUserImages(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }

}