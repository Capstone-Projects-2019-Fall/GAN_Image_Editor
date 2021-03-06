"use strict";

function ajax_upload_form (id){
    console.log("ajax_upload_form called.");

    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest(); //For Firefox, Safari, Opera
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP"); //For IE 5+
    } else {
        alert('ajax not supported');
    }

    httpReq.open("POST", "webAPIs/uploadPhoto.jsp"); // specify which page you want to get

    httpReq.onload=function(event){ 
        if(event.target.response.toString().includes("Successful upload!")){
            if (httpReq.readyState === 4) {
                if (httpReq.status === 200) {
                    console.log(httpReq);
                }
            }
            
            account.UI('content');
        }
        else{
            alert("The server says: " + event.target.response);
        }
    };
    

    var formData = new FormData(document.getElementById(id)); 
    httpReq.send(formData);

} // end function ajax2/* 
