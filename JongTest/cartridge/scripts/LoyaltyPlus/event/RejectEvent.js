/**
 * RejectEvent.js
 * 
 *  Change event status to rejected.
 *
 *   @input emailAddress : String
 *   @input extCustomerId : String
 *   @input eventId : String
 * 
 */

var EventService = require('../service/EventService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "RejectEvent.js");

function execute(args) {
	var rejectEventResponse = rejectEvent(args);
    return rejectEventResponse.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function rejectEvent(args) {
    var rejectEventResponse = {
    	success 		: 	false
    };

    try {
    	var result = EventService.reject(args.emailAddress, args.extCustomerId, args.eventId);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return rejectEventResponse;
}

module.exports = {
    'execute': execute,
    'rejectEvent': rejectEvent
}