"use strict";

function userLogout(id){
    
    var contentArea = id;
    
    ajax({url:"webAPIs/logoffAPI.jsp", successFn:success, errorId:contentArea});
    
    function success(response) {
        
        var contentElement = document.getElementById(contentArea);
         
        /*
        contentElement.innerHTML = "";
        contentElement.innerHTML = "You have successfully logged off!";
        */
       
        alert("You have successfully logged off!");
        
        var navBarLogin = document.getElementById("login");
        navBarLogin.innerHTML = "Login";
        navBarLogin.href= "#/userLogon";
    }
    
}