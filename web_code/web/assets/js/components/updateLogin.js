"use strict";

var update = {};
update.loginLink = document.getElementById('login');

function updateLogin (){
    //ajax
    var throwAway = document.createElement("div");
    ajax({url:"webAPIs/getProfileAPI.jsp", successFn:success, errorId:throwAway});
    
    //success function that will update
    function success (response){
        myconsole.log("updateLogin ajax call. Response: ", response);
        
        if(response.toString().includes("No user logged in.")){
            update.userHasLoggedOff();
        }
        else{   //user is already logged in    
            update.userHasLoggedIn();
        }
    }
}

update.userHasLoggedOff = function () {
    this.loginLink.innerHTML = "Log in";
    this.loginLink.setAttribute("href", "#/userLogon");
    
    if(location.hash.slice(1).includes("userAccount")){
        home("content");
    }
    
};

update.userHasLoggedIn = function () {
    this.loginLink.innerHTML = "Account";
    this.loginLink.setAttribute("href", "#/userAccount");
    
    if(location.hash.slice(1).includes("userLogon")){
        account.UI("content");
    }
};

update.userHasEnteredAccountPage = function () {
    this.loginLink.innerHTML = "Logout";
    this.loginLink.setAttribute("href", "#/userLogout");
};

update.userHasLeftAccountPage = function () {
    this.loginLink.innerHTML = "Account";
    this.loginLink.setAttribute("href", "#/userAccount");
};