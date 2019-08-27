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
 *   @input page : Number
 *   @output result : Object
 * 
 */

var CustomerSearchService = require('../service/CustomerSearchService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "SearchCustomer.js");

function execute(args) {
	var result = run(args.emailAddress, args.lastName, args.phone, args.address1, args.postalCode, args.page);
    args.result = response;
    return result.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress, lastName, phone, address1, postalCode, page) {
    var result = null;
    
    try {
    	result = CustomerSearchService.run(emailAddress, lastName, phone, address1, postalCode, page);
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