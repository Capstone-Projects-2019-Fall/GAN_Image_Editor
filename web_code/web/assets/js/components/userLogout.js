"use strict";

function userLogout(){
    
    var throwAway = document.createElement("div");
    ajax({url:"webAPIs/logoffAPI.jsp", successFn:success, errorId:throwAway});
    
    function success(response) {
        myconsole.log("userLogout ajax call. Response:", response);
        
        if(response.toString().includes("Logged off!")){ 
            alert("You have successfully logged off!");
            
            home('content');
            update.userHasLoggedOff();
        }
        else{
            alert("Error when logging out");
        }
    }
   
}
