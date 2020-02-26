/*******************************************************************************
 * GetCustomerCoupons.js
 * 
 * Get customer coupons. Either externalCustomerId or emailAddress is
 * required.
 * 
 * @input externalCustomerId : String
 * @input emailAddress : String
 * @input status : String 
 *        "active" - code has not yet been assigned to a customer
 *        "redeemed" - the code has been assigned to a customer, but not yet used
 *        "used" - customer has used the code in a purchase
 *        "expired" - the code expiration date has passed, and the code was not used before the expiration date
 *        "invalid" - code has been marked invalid via coupon/update API call
 * @output success : Boolean
 * @output coupons : Array
 * @output errorMessage : String
 */

var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "GetCustomerCoupons.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.emailAddress, args.status);
	args.success = response.success;
	args.coupons = response.coupons;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, emailAddress, status) {
	var CouponsResponse = require('../helper/model/CouponsResponse');
	var response = {};
	var validationResult = {};
	try {
		validationResult.success = !empty(externalCustomerId) || !empty(emailAddress);
		if (!validationResult.success) {
			return validationResult;
		}
		var result = require('../helper/service/CustomerCouponsService').run(externalCustomerId, emailAddress);
		if (result.object) {
			response = new CouponsResponse(status, result.object.success, result.object.data,
					result.errorMessage);
		} else {
			response = new CouponsResponse(status, false, null, result.errorMessage);
		}
	} catch (e) {
		var exception = e;
		var errMessage = exception.message + "\n" + exception.stack;
		logger.error(errMessage);
		response = new CouponsResponse(status, false, null, errMessage);
	}
	logger.debug("response: " + JSON.stringify(response));
	return response;
}

module.exports = {
	'execute' : execute,
	'run' : run
}