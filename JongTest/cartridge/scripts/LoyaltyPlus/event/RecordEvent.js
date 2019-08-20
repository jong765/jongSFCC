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
	var customerShowResponse = customerShow(args);
    args.customerInfo = customerShowResponse.customerInfo;
    return customerShowResponse.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function customerShow(args) {
    var customerShowResponse = {
    	success 		: 	false,
    	customerInfo 	: 	null
    };

    try {
    	var result = CustomerService.customerShow(args.emailAddress, args.lpCustomerId, args.extCustomerId);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return customerShowResponse;
}

module.exports = {
    'execute': execute,
    'customerShow': customerShow
}