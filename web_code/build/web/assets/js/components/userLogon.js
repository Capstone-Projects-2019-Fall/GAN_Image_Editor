"use strict";

function userLogon (id) {
    logon.UI('content');
    /*
    var throwAway = document.createElement("div");
    ajax({url:"webAPIs/getProfileAPI.jsp", successFn:success, errorId:throwAway});
    
    function success(response) {
        
        if(response.toString().endsWith("No user logged in.")){ 
            logon.UI(id);
        }
        else{   //user is already logged in            
            alert("You are already logged in!");
        }
    }
    */
   ;
}

var logon = {};

logon.UI = function (id) { 
    
    document.getElementById(id).innerHTML = "";
    
    var content = `
        <section id="two">
            <div class="inner">
                <article>
                        <div class="content">
                                <h2> Logon </h2>
                                Email Address: <input type="text" id="logonEmailAddress"/>
                                &nbsp;
                                Password: <input type="password" id="logonPassword"/>
                                &nbsp;
                                <br/>
                                <input type="button" value="Submit" onclick="logon.loginUser('logonEmailAddress','logonPassword','msgArea')"/>
                                <br/> <br/>
                                <div id="msgArea"></div>
                        </div>
                </article>
                <article class="alt">
                        <div class="content">
                                <h2>Register</h2>
                                Email Address: <input type="text" id="registerEmailAddress"/>
                                &nbsp;
                                Password: <input type="password" id="registerPassword"/>
                                &nbsp;
                                Re-enter Password: <input type="password" id="registerPassword2"/>
                                &nbsp;
                                <br/>
                                <input type="button" value="Submit" onclick="logon.registerUser('registerEmailAddress','registerPassword','registerPassword2','msgArea2')"/>
                                <br/> <br/>
                                <div id="msgArea2"></div>
                        </div>
                </article>
            </div>
        </section>
    
    `; // closing back tick
   
    document.getElementById(id).innerHTML = content;
    
};


logon.registerUser = function (emailId, pwId, pwId2, msgId){
    
    if(!emailId || !pwId || !pwId2 || !msgId){
        console.log("registerUser needs to be passed in an emailId, pwId, pwId2, and msgId.");
        return;
    }
    
    if(!document.getElementById(msgId) || !document.getElementById(emailId) || !document.getElementById(pwId) || !document.getElementById(pwId2)){
        console.log("registerUser could not find a HTML element associated with one of the passed in id's.");
        return;
    }
    
    var contentMsg = "";
    var messageId = msgId;
    var messageElement = document.getElementById(messageId);
    var userEmailElement = document.getElementById(emailId);
    var userPasswordElement = document.getElementById(pwId);
    var userPasswordElement2 = document.getElementById(pwId2);
    var userEmail = userEmailElement.value;
    var userPassword = userPasswordElement.value;
    var userPassword2 = userPasswordElement2.value;
    
    messageElement.innerHTML = contentMsg;
    
    if(userEmail.length < 1){
        contentMsg += "Please enter in a valid email address.";
        messageElement.innerHTML = contentMsg;
        return;
    }
    else if(userPassword.length < 1){
        contentMsg += "Please enter in a valid password.";
        messageElement.innerHTML = contentMsg;
        return;
    }
    else if(userPassword2.length < 1){
        contentMsg += "Please enter in a valid re-entry password.";
        messageElement.innerHTML = contentMsg;
        return;
    }
    else if(userPassword !== userPassword2) {
        contentMsg += "Passwords do not match.";
        messageElement.innerHTML = contentMsg;
        return;
    }
    
    /* Check if user already has an account... TODO */
    
    /* Create account... ajax to database insert record */
    ajax({
        url:"webAPIs/registerUser.jsp?jsonData=" + "{\"userEmail\":\"" + userEmail + "\", \"userPassword\":\"" + userPassword + "\", \"userPassword2\":\"" + userPassword2 + "\"}", 
        successFn: registerResponse,
        errorId: msgId
    });
    
    function registerResponse(response){
        console.log("****** Register Response ******");
        console.log(response);
        console.log("*****^ Register Response ^*****");
        
        logon.loginUserWithValues(userEmail, userPassword, messageId);
        
        if(response.errorMsg.length === 0){
            messageElement.innerHTML = "You have successfully registered!";
        }
        else{
            messageElement.innerHTML = "Registration Failed. " + response.errorMsg;
        }
        
        userPasswordElement.value = "";
        userPasswordElement2.value = "";
    }
};

logon.loginUserWithValues = function (userEmail, userPassword, msgId){
    
    ajax({url:"webAPIs/getProfileAPI.jsp", successFn:success, errorId:msgId});
    
    function success(response) {
        var urlString = "webAPIs/logonAPI.jsp?email=" + userEmail + "&pw=" + userPassword;
        
        console.log("------------------------");
        console.log("response passed into function success in userLogon.js");
        console.log(response);
        console.log("------------------------");
        
        if(response.toString().includes("No user logged in.")){ //response.responseText.endsWith("No user logged in.")
            ajax({url:urlString, successFn:showLogon, errorId:msgId});
        }
        else{
            alert("You are already logged on!");
            
            update.userHasLoggedIn();
        }
    }
    
    function showLogon(response){
    
        console.log("------------------------");
        console.log("response passed into function showLogon in userLogon.js");
        console.log(response);//.responseText.substr(10));
        console.log("------------------------");

        //var obj = JSON.parse(response.responseText.substr(10));
        var obj = response;
        var contentElement = document.getElementById(msgId);
        
        if(typeof obj === 'string' && obj.includes("User not found") ){
            document.getElementById(msgId).innerHTML = "Not a valid login. Please try again.";
            return;
        }
        else{
            contentElement.innerHTML = "";
        }
        
        if(obj.errorMsg.length > 0){
            console.log(obj.errorMsg);
            console.log("-------------------------");
        }
        
        
        var welcome = document.createElement("div");
        welcome.innerHTML = 'You have successfully logged in! <br/>\n\
                               <a href="#/userAccount">Click here</a> to go to the account page.';
        contentElement.appendChild(welcome);
        
        update.userHasLoggedIn();


    }
};

logon.loginUser = function (emailId, pwId, msgId) {
    
    var userEmail = document.getElementById(emailId).value;
    var userPassword = document.getElementById(pwId).value;
    var contentArea = msgId;
    
    logon.loginUserWithValues(userEmail, userPassword, contentArea);
};