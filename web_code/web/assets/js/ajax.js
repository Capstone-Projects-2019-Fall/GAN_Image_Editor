"use strict";
// ********************** ajax *************************************   
// Make an ajax call to the given url, then if the call was successful, 
// call the Success Callback fn, otherwise, set an error message into the 
// DOM element that has id 'errorId'.
function ajax (params){
    
    // expecting params properties url, successFn, and errorId
    if (!params || !params.url || !params.successFn || !params.errorId) {
        alert ("Function ajax requires an input parameter object with properties: url, successFn, and errorId");
        return;
    }

    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest(); //For Firefox, Safari, Opera
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP"); //For IE 5+
    } else {
        alert('ajax not supported');
    }

    console.log("ready to get content " + params.url);
    httpReq.open("GET", params.url); // specify which page you want to get

    // Ajax calls are asyncrhonous (non-blocking). Specify the code that you 
    // want to run when the response (to the http request) is available. 
    httpReq.onreadystatechange = function () {

        // readyState == 4 means that the http request is complete
        if (httpReq.readyState === 4) {
            if (httpReq.status === 200) {
                
                var retval;
                try{
                    retval = JSON.parse(httpReq.responseText);
                }
                catch(err) {
                    retval = httpReq.responseText;
                }
                
                params.successFn(retval);  // like the jQuery ajax call, pass back JSON already parsed to JS objecg
            } else {
                // First use of property creates new (custom) property
                document.getElementById(params.errorId).innerHTML = "Error (" + httpReq.status + " " + httpReq.statusText +
                        ") while attempting to read '" + params.url + "'";
            }
        }
    }; // end of anonymous function

    httpReq.send(null); // initiate ajax call

} // end function ajax2