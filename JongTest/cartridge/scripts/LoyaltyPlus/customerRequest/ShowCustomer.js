/**
 * ShowCustomer.js
 * 
 *  Get customer information
 *
 *   @input emailAddress : String
 *   @input lpCustomerId : String
 *   @input extCustomerId : String
 *   @output customerInfo : Object
 * 
 */

var CustomerService = require('../service/CustomerService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "ShowCustomer.js");

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