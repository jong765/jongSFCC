/*******************************************************************************
 * GetRedeemedCoupons.js
 * 
 * Retrieve redeemed customer coupons. Used coupons will not be retrieved.
 * Either externalCustomerId or emailAddress is required.
 * 
 * @input externalCustomerId : String
 * @input emailAddress : String
 * @output success : Boolean
 * @output data : Object
 * @output errorMessage : String
 */

var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "GetCustomerOffers.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.emailAddress);
	args.success = response.success;
	args.data = response.data;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, emailAddress) {
	var LpResponse = require('../helper/model/LpResponse');
	var response = {};
	var validationResult = {};
	try {
		validationResult.success = !empty(externalCustomerId) || !empty(emailAddress);
		if (!validationResult.success) {
			return validationResult;
		}
		var result = require('../helper/service/CustomerOffersService').run(externalCustomerId, emailAddress);
		if (result.object) {
			response = new LpResponse(result.object.success, result.object.data,
					result.errorMessage);
		} else {
			response = new LpResponse(false, null, result.errorMessage);
		}
	} catch (e) {
		var exception = e;
		var errMessage = exception.message + "\n" + exception.stack;
		logger.error(errMessage);
		response = new LpResponse(false, null, errMessage);
	}
	logger.debug("response: " + JSON.stringify(response));
	return response;
}

module.exports = {
	'execute' : execute,
	'run' : run
}