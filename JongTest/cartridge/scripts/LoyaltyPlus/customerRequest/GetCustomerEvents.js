/**
 * GetCustomerEvents.js
 * 
 *  Change external customer id or personal information of a member
 *
 *   @input emailAddress : String
 *   @input lpCustomerId : String
 *   @input extCustomerId : String
 *   @input pageNumber : Number
 *   @input entriesPerPage : Number
 *   @output result : Object
 * 
 */

var CustomerEventsService = require('../service/CustomerEventsService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "GetCustomerEvents.js");

function execute(args) {
	var result = run(args.emailAddress, args.lpCustomerId, args.extCustomerId, args.pageNumber, args.entriesPerPage);
	args.result = response;
    return result.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress, lpCustomerId, extCustomerId, pageNumber, entriesPerPage) {
	var result = null;
	
    try {
    	var result = CustomerEventsService.run(emailAddress, lpCustomerId, extCustomerId, pageNumber, entriesPerPage);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return result;
}

module.exports = {
    'execute': execute,
    'run': run
}