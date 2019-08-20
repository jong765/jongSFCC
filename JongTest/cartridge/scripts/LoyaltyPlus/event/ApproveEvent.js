/**
 * ApproveEvent.js
 * 
 *  Change event status to approved.
 *
 *   @input emailAddress : String
 *   @input extCustomerId : String
 *   @input eventId : String
 * 
 */

var EventService = require('../service/EventService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "ApproveEvent.js");

function execute(args) {
	var approveEventResponse = approveEvent(args);
    return approveEventResponse.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function approveEvent(args) {
    var approveEventResponse = {
    	success 		: 	false
    };

    try {
    	var result = EventService.record(args.emailAddress, args.extCustomerId, args.eventId);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return approveEventResponse;
}

module.exports = {
    'execute': execute,
    'approveEvent': approveEvent
}