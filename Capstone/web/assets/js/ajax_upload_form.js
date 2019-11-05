"use strict";

function ajax_upload_form (){

    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest(); //For Firefox, Safari, Opera
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP"); //For IE 5+
    } else {
        alert('ajax not supported');
    }

    httpReq.open("POST", "webAPIs/uploadPhoto.jsp"); // specify which page you want to get

    httpReq.onload=function(event){ alert("The server says: " + event.target.response); };

    var formData = new FormData(document.getElementById("uploadForm")); 
    httpReq.send(formData);

} // end function ajax2/* 
