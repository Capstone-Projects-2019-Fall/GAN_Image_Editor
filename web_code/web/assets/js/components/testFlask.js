"use strict";

function testFlask(params){
    
    if(!params || !params.responseId|| !params.portNumId || !params.funcInvokeId || !params.portNumErrorId || !params.funcInvokeErrorId || !params.imageFileNameErrorId || !params.paramStringErrorId){
        myconsole.log("testFlask", "Incorrect params passed in. Need an object with portNumId, " +
                "funcInvokeId, portNumErrorId, funcInvokeErrorId, imageFileNameErrorId, and paramStringErrorId. Optional: imageFileNameId, and paramStringId");
        return;
    }
    
    var portNumErrorEle = document.getElementById(params.portNumErrorId);
    var funcInvokeErrorEle = document.getElementById(params.funcInvokeErrorId);
    var imageFileNameErrorEle = document.getElementById(params.imageFileNameErrorId);
    var paramStringErrorEle = document.getElementById(params.paramStringErrorId);
    
    clearErrorElements({firstEle:portNumErrorEle, secondEle:funcInvokeErrorEle, thirdEle:imageFileNameErrorEle, fourthEle:paramStringErrorEle});
    
    var portNum = document.getElementById(params.portNumId).value;
    var funcInvoke = document.getElementById(params.funcInvokeId).value;
    var imageFileName = document.getElementById(params.imageFileNameId).value;
    var paramString = document.getElementById(params.paramStringId).value;
    var errors = false;
    
    if(!portNum || parseInt(portNum) < 1024 || parseInt(portNum) > 49151){
        portNumErrorEle.innerHTML = "Enter in a valid port number to send request to. Range: 1024 to 49151.";
        errors = true; 
    }
    
    if(!funcInvoke){
        funcInvokeErrorEle.innerHTML = "Enter in a python function name to invoke on the GPU server.";
        errors = true;
    }

    if(imageFileName){
        imageFileName = imageFileName.replace(/\//g, "customDelim");
        console.log(imageFileName);
    }
    
    //TODO: check if image file names are on the server (create JSP file to do this)
    
    //TODO: check if there is a comma at the beginning of the paramString string or if it contains multiple commas next to each other or with only spaces in between them.
    
    if (errors){
        return;
    }
    
    var flaskURL = "http://129.32.22.10:" + portNum + "/" + funcInvoke;

    if(imageFileName || paramString){
	flaskURL += "/";
    }
    
    if(imageFileName){
        for(var i = 0 ; i < imageFileName.length ; i++){
            if(imageFileName[i] === ","){
                flaskURL += "/";
            }
            else if (imageFileName[i] === " "){
                ;
            }
            else{
                flaskURL += imageFileName[i];
            }
        }
    }

    if(imageFileName && paramString){
	flaskURL += "/";
    }
    
    if(paramString){
        for(var i = 0 ; i < paramString.length ; i++){
            if(paramString[i] === ","){
                flaskURL += "/";
            }
            else if (paramString[i] === " "){
                ;
            }
            else{
                flaskURL += paramString[i];
            }
        }
    }
    
    myconsole.log("Function testFlask. This is the flaskURL:", flaskURL);
    ajax({url:flaskURL, successFn:processGPUResponse, errorId:params.responseId});
    
    function processGPUResponse(response){
        myconsole.log("processGPUResponse() in testFlask(). Response:", response);
        document.getElementById(params.responseId).innerHTML = response.data;
        
        
        var imageElement = document.getElementById("flaskDisplayImage");
        //imageElement.style.visibility = "visible";
        imageElement.setAttribute("src", response.data);
        //imgageElement.alt = "Response Image";
    }
}

function showTestFlask (id) {
    
    
    var testFlaskHTML = `
    
        <div id="responseContainer"></div>
        <div id="testFlaskArea">
            <div id="ajaxError">&nbsp;</div>
            <table id="testFlaskTable">
                <tr>
                    <td>Port # to send to</td>
                    <td><input type="text"  id="portNum" /></td>
                    <td id="portNumError" class="error"></td> 
                </tr>
                <tr>
                    <td>Function to invoke</td>
                    <td><input type="text"  id="funcInvoke" /></td>
                    <td id="funcInvokeError" class="error"></td> 
                </tr>
                <tr>
                    <td>Image File Name(s) (Images that are stored on web server)</td>
                    <td><input type="text"  id="imageFileName" /></td>
                    <td id="imageFileNameError" class="error"></td> 
                </tr>
                <tr>
                    <td>Additional Parameter(s)</td>
                    <td><input type="text"  id="paramString" /></td>
                    <td id="paramStringError" class="error"></td> 
                </tr>
                <tr>
                    <td><button onclick="testFlask({portNumId:'portNum', funcInvokeId:'funcInvoke', imageFileNameId:'imageFileName', paramStringId:'paramString', portNumErrorId:'portNumError', funcInvokeErrorId:'funcInvokeError', imageFileNameErrorId:'imageFileNameError', paramStringErrorId:'paramStringError', responseId:'responseContainer'})">Test</button></td>
                    <td id="testError" class="error"></td>
                    <td></td>
                </tr>
            </table>
    
            <img id = flaskDisplayImage></img>
        </div>
    `;
    
    document.getElementById(id).innerHTML = testFlaskHTML;
}

function runFlask(params){
    //new param, picDescId
    if(!params || !params.responseId || !params.portNum || !params.funcInvoke || !params.imgId || !params.modelType){
        myconsole.log("runFlask", "Incorrect params passed in. Need strings portNum, funcInvoke");
        return;
    }
    
    var portNum = params.portNum;
    var funcInvoke = params.funcInvoke;
    var imageURLPathName = document.getElementById(params.imgId).src;
    var imageURLPathName2;
    var responseEle = document.getElementById(params.responseId);
    var errors = false;
    var paramString;
    var modelType = params.modelType;
    
    if(params.paramString){
        paramString = params.paramString;
    }
    
    if(parseInt(portNum) < 1024 || parseInt(portNum) > 49151){
        responseEle.innerHTML = "Error: Enter in a valid port number to send request to. Range: 1024 to 49151.";
        errors = true; 
    }
     /*
    if(funcInvoke is not style, quality, or facial){
        responseEle.innerHTML = "Enter in a python function name to invoke on the GPU server.";
        errors = true;
    }
    */
   
    if(imageURLPathName){
        imageURLPathName = imageURLPathName.replace(/\//g, "customDelim");
        console.log(imageURLPathName);
    }
    else{
        responseEle.innerHTML = "Error: Enter in a valid image URL.";
        errors = true; 
    }
    
    if(params.imgId2){
        imageURLPathName2 = document.getElementById(params.imgId2).src;
        if(imageURLPathName2){
            imageURLPathName2 = imageURLPathName2.replace(/\//g, "customDelim");
            console.log(imageURLPathName2);
        }
        else{
            responseEle.innerHTML = "Error: Enter in a valid 2nd image URL.";
            errors = true; 
        }
    }
    
    //TODO: check if image file names are on the server (create JSP file to do this)
    
    //TODO: check if there is a comma at the beginning of the paramString string or if it contains multiple commas next to each other or with only spaces in between them.
    
    if (errors){
        return;
    }
    
    var flaskURL = "http://129.32.22.10:" + portNum + "/" + funcInvoke;
    var cisPath = "http:customDelimcustomDelimcis-linux2.temple.edu:8080customDelimFA19_3308_tud31981customDelimpicscustomDelimtest";


    if(imageURLPathName){
        myconsole.log("imageURLPathName is: ",imageURLPathName);
        flaskURL += "/";
        flaskURL += imageURLPathName;
    }
    
    if(imageURLPathName2){
        myconsole.log("imageURLPathName2 is: ",imageURLPathName2);
        flaskURL += "/";
        flaskURL += imageURLPathName2;
    }
    
    myconsole.log("THIS IS THE FLASK URL: ", flaskURL);
    
    if(paramString){
        flaskURL += "/";
        flaskURL += paramString;
    }
    
    flaskURL += "/";
    flaskURL += modelType;
    
    myconsole.log("Function runFlask. This is the flaskURL:", flaskURL);
    ajax({url:flaskURL, successFn:processGPUResponse, errorId:responseEle});
    
    function processGPUResponse(response){
        myconsole.log("processGPUResponse() in runFlask(). Response:", response);
        //document.getElementById(responseEle).innerHTML = response.data;
        
        var outputImgId;
        if(funcInvoke.includes("facial")){
            if(modelType.includes("0")){
                outputImgId = document.getElementById("facialOutputImg");
            }
            else{
                outputImgId = document.getElementById("customFacialOutputImg");
            }
        }
        else if(funcInvoke.includes("style")){
            if(modelType.includes("0")){
                outputImgId = document.getElementById("styleOutputImg");
            }
            else{
                outputImgId = document.getElementById("customStyleOutputImg");
            }
        }
        else if(funcInvoke.includes("quality")){
            if(modelType.includes("0")){
                outputImgId = document.getElementById("qualityOutputImg");
            }
            else{
                outputImgId = document.getElementById("customQualityOutputImg");
            }
        }
        
        
        outputImgId.setAttribute("src", response.data);
        
        if(params.picDescId){
            var dimensionsId = document.getElementById(params.picDescId);
            paramString = paramString.replace("/", "");
            placeImageDimensions(paramString, dimensionsId);
        }
    }
}

function clearErrorElements(errorElements){
    errorElements.firstEle.innerHTML = "";
    errorElements.secondEle.innerHTML = "";
    errorElements.thirdEle.innerHTML = "";
    errorElements.fourthEle.innerHTML = "";
};