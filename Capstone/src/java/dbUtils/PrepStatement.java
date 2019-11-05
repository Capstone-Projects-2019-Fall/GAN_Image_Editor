package dbUtils;

// I'm not importing any classes from java.sql because I am using 
// fully qualified class names in the code below (to make things more obvious
// to the reader).

/* PrepStatement: a wrapper class for PreparedStatement. This wrapper class
 * handles encoding null whenever needed. It also does a thorough job of identifying
 * and showing errors. All errors are concatenated into an error message (private 
 * data member) that you can access with getter method. Each error is also printed 
 * to the Glassfish Server Output Log (in NetBeans) using System.out.println().
 */
public class PrepStatement {

    private java.sql.PreparedStatement ps = null;
    private String sql = "";
    private String errorMsg = ""; // All error messages concatenated

    /* 
    Call the prepareStatement method on the java.sql.Connection object that is 
    extracted from the DbConn object (input parameter), using the sql code that
    was also provided as input. If an exception is thrown (because the sql does not compile 
    against the open database of the connection object), an error message is written
    to the glassfish log (in NetBeans output pane). This error message will also 
    be available by calling the getErrorMsg() method.
    */
    public PrepStatement(DbConn dbc, String sql) {
        this.sql = sql;
        try {
            java.sql.Connection con = dbc.getConn();
            this.ps = con.prepareStatement(sql);
        } catch (Exception e) {
            String msg = " PrepStatement: Exception in constructor. Sql is " +this.sql + " Error message is " 
                    + e.getMessage();
            System.out.println("====> " + msg);
            this.errorMsg += msg;
        }
    }

    // this.errorMsg contains all the error messages that ever occured in this object (all
    // error messages concatenated).
    public String getErrorMsg() {
        return this.errorMsg;
    }
    
    // Replace the position-th question mark with newDate.
    // If newDate is null, encode null into that question mark.
    public String setDate(int position, java.sql.Date newDate) {
        try {
            if (newDate == null) {
                ps.setNull(position, java.sql.Types.DATE);

            } else {
                this.ps.setDate(position, newDate);
            }
            return ""; // no error
        } catch (Exception e) {
            String msg = " PrepStatement: Exception in setDate(). Sql is " + this.sql
                    + ", position: " + position + ". Error Msg: " + e.getMessage();
            System.out.println("====> " + msg);
            this.errorMsg += msg;
            return msg;
        }
    }

    // Replace the position-th question mark with newInt.
    // If newInt is null, encode null into that question mark.
    public String setInt(int position, Integer newInt) {
        try {
            if (newInt == null) {
                ps.setNull(position, java.sql.Types.INTEGER);

            } else {
                this.ps.setInt(position, newInt);
            }
            return ""; // no error
        } catch (Exception e) {
            String msg = " PrepStatement: Exception in setInt(). Sql is " + this.sql
                    + ", position: " + position + ". Error Msg: " + e.getMessage();
            System.out.println("====> " + msg);
            this.errorMsg += msg;
            return msg;
        }
    }

    // Replace the position-th question mark with newBigDecimal.
    // If newBigDecimal is null, encode null into that question mark.
    public String setBigDecimal(int position, java.math.BigDecimal newBigDecimal) {
        try {
            if (newBigDecimal == null) {
                ps.setNull(position, java.sql.Types.DECIMAL);

            } else {
                this.ps.setBigDecimal(position, newBigDecimal);
            }
            return ""; // no error
        } catch (Exception e) {
            String msg = " PrepStatement: Exception in setBigDec(). Sql is " + this.sql
                    + ", position: " + position + ". Error Msg: " + e.getMessage();
            System.out.println("====> " + msg);
            this.errorMsg += msg;
            return msg;
        }
    }

    // Replace the position-th question mark with newString.
    // If newString is null, encode "" empty string into that question mark.
    public String setString(int position, String newString) {
        try {
            if (newString == null) {
                newString = "";
            }
            this.ps.setString(position, newString);
            return ""; // no error
        } catch (Exception e) {
            String msg = " PrepStatement: Exception in setString(). Sql is " + this.sql
                    + ", position: " + position + ". Error Msg: " + e.getMessage();
            System.out.println("====> " + msg);
            this.errorMsg += msg;
            return msg;
        }
    }

    // returns the number of rows affected - like PreparedStatement.executeUpdate() would have done
    public int executeUpdate() {
        try {
            int numRows = this.ps.executeUpdate();
            return numRows;
        } catch (Exception e) {
            String msg = " PrepStatement: Exception in executeUpdate(). Sql is " + this.sql
                    + ". Error Msg: " + e.getMessage();
            System.out.println("====> " + msg);
            this.errorMsg += msg;
            return -1;
        }
    }
    
} // class