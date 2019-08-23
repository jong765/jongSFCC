/**
 * SearchCustomer.js
 * 
 *  Search for customers using data such as email address, phone number or name.
 *
 *   @input emailAddress : String
 *   @input lastName : String
 *   @input phone : String
 *   @input address1 : String
 *   @input postalCode: String
 *   @output customerInfo : Object
 * 
 */

var CustomerService = require('../service/CustomerService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "LookupCustomer.js");

function execute(args) {
	var customerSearchResponse = customerSearch(args.emailAddress, args.lastName, args.phone, args.address1, args.postalCode, args.page);
    args.customerInfo = customerSearchResponse.customerInfo;
    return customerSearchResponse.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function search(emailAddress, lastName, phone, address1, postalCode, page) {
    var customerSearchResponse = {
    	success 		: 	false
    };

    try {
    	var result = CustomerService.customerSearch(args.emailAddress, args.lastName, args.phone, args.address1, args.postalCode, args.page);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return customerSearchResponse;
}

module.exports = {
    'execute': execute,
    'search': search
}