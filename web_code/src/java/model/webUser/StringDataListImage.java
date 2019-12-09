package model.webUser;

import java.io.IOException;
import java.util.ArrayList;
import java.sql.ResultSet;


// The purpose of this class is to have a nice java object that can be converted to JSON 
// to communicate everything necessary to the web page (the array of users plus a possible 
// list level database error message). 
public class StringDataListImage {

    public String dbError = "";
    public ArrayList<StringDataImage> imageList = new ArrayList();

    // Default constructor leaves StringDataList objects nicely set with properties 
    // indicating no database error and 0 elements in the list.
    public StringDataListImage() {
    }

    // Adds one StringData element to the array list of StringData elements
    public void add(StringDataImage stringData) {
        this.imageList.add(stringData);
    }

    // Adds creates a StringData element from a ResultSet (from SQL select statement), 
    // then adds that new element to the array list of StringData elements.
    public void add(ResultSet results) throws IOException {
        StringDataImage sd = new StringDataImage(results);
        this.imageList.add(sd);
    }
}
