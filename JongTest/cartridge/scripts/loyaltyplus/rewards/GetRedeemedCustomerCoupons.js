/*******************************************************************************
 * GetRedeemedCustomerCoupons.js
 * 
 * Get redeemed customer coupons. Either externalCustomerId or emailAddress is
 * required.
 * 
 * @input externalCustomerId : String
 * @input emailAddress : String
 * @output success : Boolean
 * @output data : Object
 * @output errorMessage : String
 */

var logger = require('dw/system/Logger').getLogger("loyaltyplus-error",
		"GetRedeemedCustomerCoupons.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.emailAddress);
	args.success = response.success;
	args.offers = response.offers;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, emailAddress) {
	var RedeemedCouponsResponse = require('../helper/model/RedeemedCouponsResponse');
	var response = {};
	var validationResult = {};
	try {
		validationResult.success = !empty(externalCustomerId) || !empty(emailAddress);
		if (!validationResult.success) {
			return validationResult;
		}
		var result = require('../helper/service/CustomerCouponsService').run(externalCustomerId, emailAddress);
		if (result.object) {
			response = new RedeemedCouponsResponse(result.object.success, result.object.data,
					result.errorMessage);
		} else {
			response = new RedeemedCouponsResponse(false, null, result.errorMessage);
		}
	} catch (e) {
		var exception = e;
		var errMessage = exception.message + "\n" + exception.stack;
		logger.error(errMessage);
		response = new RedeemedCouponsResponse(false, null, errMessage);
	}
	logger.debug("response: " + JSON.stringify(response));
	return response;
}

module.exports = {
	'execute' : execute,
	'run' : run
}