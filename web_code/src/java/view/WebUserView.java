package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.webUser.*;

// classes in my project
import dbUtils.*;
import java.awt.Dimension;
import java.io.File;
import java.util.Iterator;
import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

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
    
    public static StringDataImage getImageByName(StringData loggedOnWebUser, String fileName){
        StringDataImage sdi = new StringDataImage();
        sdi.imagePath = fileName;
        
        try{
            File imageFile = new File("/var/lib/tomcat7/webapps/FA19_3308_tud31981/pics/test/" + fileName);
            try(ImageInputStream in = ImageIO.createImageInputStream(imageFile)){
                final Iterator<ImageReader> readers = ImageIO.getImageReaders(in);
                if (readers.hasNext()) {
                    ImageReader reader = readers.next();
                    try {
                        reader.setInput(in);
                        Dimension dimensions = new Dimension(reader.getWidth(0), reader.getHeight(0));
                        Integer w = new Integer(dimensions.width);
                        Integer h = new Integer(dimensions.height);
                        sdi.width = w.toString();
                        sdi.height = h.toString();
                    } finally {
                        reader.dispose();
                    }
                }
            } 
        } catch (Exception e) {
            sdi.errorMsg += " " + e.getMessage();
        }
        
        return sdi;
    }

}