package dbUtils;

public class ValidationUtils {

    /* Check string "val" to see if it has a valid java.sql.Date in it.
     * Return "" if the input is OK. Otherwise, return error message. */
    public static String dateValidationMsg(String val, boolean required) {
        // System.out.println("*************trying to convert ["+val+"] to date");

        if (val == null) {
            return "ValidationUtils.dateValidationMsg(): Programmer error - should not be trying to validate null.";
        }
        if ((val.length() == 0) && !required) {
            return "";  // Since this field is not required, empty string is valid user entry.
        }
        try {
            java.text.SimpleDateFormat dateformat = new java.text.SimpleDateFormat("MM/dd/yyyy"); //please notice the capital M
            dateformat.setLenient(false);
            java.util.Date myDate = dateformat.parse(val);
            java.sql.Date convertedDate = new java.sql.Date(myDate.getTime()); // // not using (on purpose).
            return ""; // means date is good
        } catch (Exception e) {
            return "Please enter a valid date (format: MM/DD/YYYY)";  // can also add (to debug) + e.getMessage();
        }
    } // dateValidationMsg

    /* Convert "val" (String) to java.sql.Date and return the converted date. */
    public static java.sql.Date dateConversion(String val) {

        if ((val == null) || (val.length() == 0)) {
            return null;
        }
        try {
            java.text.SimpleDateFormat dateformat = new java.text.SimpleDateFormat("MM/dd/yyyy"); //please notice the capital M
            dateformat.setLenient(false);
            java.util.Date myDate = dateformat.parse(val);
            return new java.sql.Date(myDate.getTime());
            //return d.toString(); // debugging...
        } catch (Exception e) {
            System.out.println("ValidationUtils.dateConversion(): cannot convert " + val + " to date.");
            return null;
        }
    } // dateConversion()


    /* Check string "val" to see if it has a valid BigDecimal in it.
     * Return "" if the input is OK. Otherwise, return error message. */
    public static String decimalValidationMsg(String val, boolean required) {

        if (val == null) {
            return "ValidationUtils.decimalValidationMsg(): Programmer error - should not be trying to validate null.";
        }
        if ((val.length() == 0) && !required) {
            return "";  // Since this field is not required, empty string is valid user entry.
        }
        try {
            java.math.BigDecimal convertedDecimal = new java.math.BigDecimal(val); // not using (on purpose).
            return "";
        } catch (Exception e) {
            return "Please enter an dollar amount";
        }
    } // decimalValidationMsg()

    /* Convert "val" (String) to java.math.BigDecimal and return the converted BigDecimal. */
    public static java.math.BigDecimal decimalConversion(String val) {

        if ((val == null) || (val.length() == 0)) {
            return null;  // Since this field is not required, empty string is valid user entry.
        }
        try {
            return new java.math.BigDecimal(val);
        } catch (Exception e) {
            System.out.println("ValidationUtils.decimalConversion(): cannot convert " + val + " to java.math.BigDecimal.");
            return null;
        }
    } // decimalValidationMsg()

    /* Check string "val" to see if it has a valid integer in it.
     * Return "" if the input is OK. Otherwise, return error message. */
    public static String integerValidationMsg(String val, boolean required) {
        if (val == null) {
            return "ValidationUtils.integerValidationMsg(): Programmer error - should not be trying to validate null.";
        }
        if ((val.length() == 0) && !required) {
            return "";  // Since this field is not required, empty string is a valid user entry.
        }
        try {
            Integer convertedInteger = new Integer(val); // not using (on purpose).
            return "";
        } catch (Exception e) {
            return "Please enter an integer";
        }
    } // integerValidationMsg()

    /* Convert "val" (String) to Integer and return the converted Integer. */
    public static Integer integerConversion(String val) {

        if ((val == null) || (val.length() == 0)) {
            return null;
        }
        try {
            return new Integer(val);
        } catch (Exception e) {
            System.out.println("ValidationUtils.integerConversion(): cannot convert " + val + " to Integer.");
            return null;
        }
    } // integerConversion()   

    /* Check string "val" to see if it meets the db constraints (e.g., not emtpy string 
     * if it is a required field, not longer than db allows). If OK, return "". 
     * Otherwise, return error message. */
    public static String stringValidationMsg(String val, int maxlen, boolean required) {

        if (val == null) {
            return "ValidationUtils.stringValidationMsg(): Programmer error - should not be trying to validate null.";
        }
        if (val.length() == 0) {
            if (required) {
                return "Input is required";
            } else {
                return ""; // Empty string OK if fld not req'd.
            }
        }

        if (val.length() > maxlen) {
            return "Please shorten to [" + val.substring(0, maxlen) + "]";
        } else {
            return ""; // input is good
        }
    }
}