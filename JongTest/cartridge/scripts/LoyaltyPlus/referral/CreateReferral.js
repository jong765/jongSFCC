/**
 * CreateReferral.js
 * 
 *  Get customer information
 *
 *   @input emailAddress : String
 *   @input lpCustomerId : String
 *   @input extCustomerId : String
 * 
 */

var ApiService = require('../service/ApiService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "CreateReferral.js");

function execute(args) {
	var createReferralResponse = createReferral(args);
    return createReferralResponse.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function createReferral(args) {
    var createReferralResponse = {
    	success 		: 	false
    };

    try {
    	var result = ApiService.createReferral(args.emailAddress, args.lpCustomerId, args.extCustomerId);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return createReferralResponse;
}

module.exports = {
    'execute': execute,
    'createReferral': createReferral
}