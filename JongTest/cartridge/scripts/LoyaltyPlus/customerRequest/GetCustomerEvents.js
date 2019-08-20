/**
 * GetCustomerEvents.js
 * 
 *  Change external customer id or personal information of a member
 *
 *   @input emailAddress : String
 *   @input lpCustomerId : String
 *   @input extCustomerId : String
 * 
 */

var CustomerService = require('../service/CustomerService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "GetCustomerEvents.js");

function execute(args) {
	var customerEventsResponse = customerEvents(args);
    return customerEventsResponse.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function customerEvents(args) {
    var customerEventsResponse = {
    	success 		: 	false
    };

    try {
    	var result = CustomerService.customerEvents(args.emailAddress, args.lpCustomerId, args.extCustomerId);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return customerEventsResponse;
}

module.exports = {
    'execute': execute,
    'customerEvents': customerEvents
}