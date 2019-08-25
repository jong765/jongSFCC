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
 *   @output response : Object
 * 
 */

var CustomerEventsService = require('../service/CustomerEventsService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "GetCustomerEvents.js");

function execute(args) {
	var response = run(args);
	args.response = response;
    return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(args) {
	var response = null;
	
    try {
    	var response = CustomerEventsService.run(args.emailAddress, args.lpCustomerId, args.extCustomerId, args.pageNumber, args.entriesPerPage);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return response;
}

module.exports = {
    'execute': execute,
    'run': run
}