"use strict";

var myconsole = {};

myconsole.log = function (traceString, logString) {
    console.log("-----------------------");
    console.log("Trace: " + traceString);
    console.log(logString);
    console.log("-----------------------");
};