"use strict";

function ajax_upload_form_non_user (formId, pictureId){
    
    if(!formId || !pictureId){
        console.log("ajax_upload_form_non_user needs a formId and pictureId");
    }

    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest(); //For Firefox, Safari, Opera
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP"); //For IE 5+
    } else {
        alert('ajax not supported');
    }

    httpReq.open("POST", "webAPIs/uploadPhotoNonUser.jsp"); // specify which page you want to get

    httpReq.onload=function(event){ 
        if(true){ //(event.target.response.toString().includes("Successful upload!")){
            myconsole.log("Testing new upload. Response:", event.target.response.toString());
            var fileName = event.target.response.toString().trim();
            
            document.getElementById(pictureId).setAttribute("src", "pics/test/" + fileName);
       
            myconsole.log("Testing new upload. File Name:", fileName.trim());
            //document.getElementById(pictureId)
        }
        else{
            alert("Error. The server says: " + event.target.response);
        }
    };

    var formData = new FormData(document.getElementById(formId)); 
    httpReq.send(formData);

} // end function ajax2/* 
