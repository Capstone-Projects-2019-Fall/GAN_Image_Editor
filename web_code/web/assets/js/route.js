"use strict";
            
var routes = [];
routes['/'] = home;  // home is a function stored in js/components/home.js
routes['/home'] = home;
routes['/facialGAN'] = facialGAN;
routes['/userLogon'] = userLogon;
routes['/userLogout'] = userLogout;
routes['/userAccount'] = userAccount;
routes['/styleGAN'] = styleGAN;
routes['/qualityGAN'] = qualityGAN;

var contentId = "content";

function route(){
    // remove leading # from string that holds the clicked link
    var path = location.hash.slice(1) || '/';
    
    updateLogin();
    
    if (!routes[path]) {
        document.getElementById(contentId).innerHTML = "Error: link '" + path +
                "' was never added to the routing.";
    } else {
        routes[path](contentId); // invoke function routes[path], a JS funtion/component
    }
    
    
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

// Listen on hash change (whenever a link is clicked or href changed)
window.addEventListener('hashchange', route);

// Set initial hash to home
window.location.hash = "/xxx";
window.location.hash = "/";