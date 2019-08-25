/**
 * ShowCustomer.js
 * 
 *  Get customer information
 *
 *   @input emailAddress : String
 *   @input extCustomerId : String
 *   @input vendor : String
 *   @input vendorId : String
 *   @input include : String
 *   @output response : Object
 * 
 */

var CustomerShowService = require('../service/CustomerShowService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "ShowCustomer.js");

function execute(args) {
	var response = run(args.emailAddress, args.extCustomerId, args.vendor, args.vendorId);
    args.response = response;
    return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress, extCustomerId, vendor, vendorId, include) {
    var response = null;

    try {
    	response = CustomerShowService.run(emailAddress, extCustomerId, vendor, vendorId, include);
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