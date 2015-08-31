/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {
    "use strict";
    var showText;
    showText = function (target, message, index, interval) {
        if (index < message.length) {
            $(target).append(message[index++]);
            setTimeout(function () {
                showText(target, message, index, interval);
            }, interval);
        }
    };
    $(function () {
        showText(".logo-name", "Avnet premier league", 0, 100);
    });
    $(function () {
        showText(".sub-text", "Fantasy league", 0, 300);
    });
	
});