"use strict";

var router = {};

(function(){
    var contentId;
    var errorId;
    var routes;
    var initialized = false;
    
    router.initialize = function(initialContentId, initialErrorId){
        
        if(!idsAreValid([initialContentId, initialErrorId])){
            console.log("Invalid arguments passed into router.initialize. Ids must correspond to existing DOM elements.");
            return false;
        }
        
        contentId = initialContentId;
        errorId = initialErrorId;
        
        routes = getInitialRoutes();
        
        if(!checkRoutes(routes)){
            console.log("Unknown route(s) were found.");
            return false;
        }
        
        setHashChangeListener(route);
        initialized = true;
    };
    
    router.addRoute = function(href, func) {
        var errorString = "";
        
        if(!isFunction(func)){
            errorString += " Invalid function passed to router.addRoute for href: " + href + ". ";
        }
        
        if(!(typeof href === "string") || href.length === 0 ){
            errorString += " Invalid href passed to router.addRoute: " + href + ".";
        }
        
        if(routes[href]){
            errorString += " Error. Attempted to add route that already existed: " + href + ".";
        }
        
        if(errorString.length > 0){
            console.log(errorString);
            return false;
        }
        else {
            routes[href] = func;
        }
        
        return true;
    };
    
    router.deleteRoute = function(href) {
        var errorString = "";
        
        if(!(typeof href === "string") || href.length === 0 ){
            errorString += " Invalid href passed to router.addRoute: " + href + ".";
            console.log(errorString);
            return false;
        }
        else {
            //TODO: Delete route. (simply using the delete keyword is not sufficient)
        }
        
        return true;
    };
    
    router.setContentId = function(id) {
        if(idIsValid(id)){
            contentId = id;
            return true;
        }
        
        return false;
    };
    
    router.setErrorId = function(id) {
        if(idIsValid(id)){
            errorId = id;
            return true;
        }
        
        return false;
    };
    
    function route(){
        if(!routes || !location.hash){
            if(idIsValid(errorId)){
                document.getElementById(errorId).innerHTML = "Error: No routes were defined \n\
                        OR location.hash is not defined.";
            }
            else{
                console.log("Error: No routes were defined \n\
                        OR location.hash is not defined.");
            }
            
            return;
        }
        
        // remove leading # from string that holds the clicked link
        var path = location.hash.slice(1) || '/';

        updateLogin();

        if (!routes[path]) {
            window.location.hash = "/home";
            
            if(idIsValid(errorId)){
                document.getElementById(errorId).innerHTML = "Error: link '" + path +
                    "' was never added to the routing.";
            }
            else{
                console.log("Error: link '" + path +
                    "' was never added to the routing.");
            }
            
            return;
        } else {
            routes[path](contentId); // invoke function routes[path], a JS funtion/component
        }


        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    
    function setHashChangeListener(routeFunc){
        // Listen on hash change (whenever a link is clicked or href changed)
        window.addEventListener('hashchange', routeFunc);

        // Set initial hash to home
        window.location.hash = "/xxx";
        window.location.hash = "/";
    }

    function getInitialRoutes (){
        var routes = [];
        routes['/'] = home;  // home is a function stored in js/components/home.js
        routes['/home'] = home;
        routes['/userLogon'] = userLogon;
        routes['/userLogout'] = userLogout;
        routes['/userAccount'] = userAccount;
        routes['/facialGAN'] = facialGAN;
        routes['/styleGAN'] = styleGAN;
        routes['/qualityGAN'] = qualityGAN;
        routes['/sources'] = sources;
        
        return routes;
    }
    
    function checkRoutes(routeArray){
        for(const route of routeArray){
            if(!isFunction(route)){
                console.log("Unknown route found:");
                console.log(route);
                return false;
            }
        }
        
        return true;
    }
    
    function isFunction (func){
        if(typeof func === "function"){
            return true;
        }
        
        return false;
    }
    
    function idsAreValid(idArray){
        for(const id of idArray){
            if(!idIsValid(id)){
                return false;
            }
        }
        
        return true;
    }
    
    function idIsValid(id){
        if(!id || !document.getElementById(id)){
            console.log("Invalid id: " + id);
            return false;
        }
        
        return true;
    }
    
    router.testRouter = function(messageAreaId) {
        //document.getElementById(messageAreaId);
        //window.location.hash = "/test";
    };
    
})();