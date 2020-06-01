"use strict";


function $(element) { return document.getElementById(element); }
function on(element, event, func) { element.addEventListener(event, func, true); }


exports.$ = $;
exports.on = on;