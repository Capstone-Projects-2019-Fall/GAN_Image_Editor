"use strict";
// ********************** ajax *************************************   
// Make an ajax call to the given url, then if the call was successful, 
// call the Success Callback fn, otherwise, set an error message into the 
// DOM element that has id 'errorId'.
function ajax_test_flask (id){

    console.log("---------------------");
    console.log("Testing flask ajax...");
    
    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest(); //For Firefox, Safari, Opera
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP"); //For IE 5+
    } else {
        alert('ajax not supported');
    }
    
    httpReq.open("GET", "http://129.32.22.10:9000/sumtwonumber/10/9"); // specify which page you want to get

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

		console.log("----------------------");
		console.log("ajax flask returned:");
		console.log(retval);
		console.log("----------------------");
                
            } else {
                console.log("failed?");
            }
        }
    }; // end of anonymous function

    httpReq.send(null); // initiate ajax call

    console.log("---------------------");
} // end function