/**
 * RecordEvent.js
 * 
 *  Record an event.
 *
 *   @input emailAddress : String
 *   @input extCustomerId : String
 *   @input type : String
 * 
 */

var ApiService = require('../service/ApiService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "RecordEvent.js");

function execute(args) {
	var recordEventResponse = recordEvent(args);
    return recordEventResponse.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function recordEvent(args) {
    var recordEventResponse = {
    	success 		: 	false
    };

    try {
    	var result = ApiService.record(args.emailAddress, args.extCustomerId, args.type);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return recordEventResponse;
}

module.exports = {
    'execute': execute,
    'recordEvent': recordEvent
}