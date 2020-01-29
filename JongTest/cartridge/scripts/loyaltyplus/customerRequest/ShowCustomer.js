/*******************************************************************************
 * ShowCustomer.js
 * 
 * Get customer information. Either externalCustomerId or emailAddress is
 * required. If both are passed, all parameters must identify the same customer;
 * otherwise, an error will be returned.
 * 
 * @input externalCustomerId : String
 * @input emailAddress : String
 * @input include : String Possible values: badges coupons detail
 *        member_attributes punchcards purchase_stats reward_stats rewards
 *        reward_groups offers redemption_limits tier_stats referrals identities
 *        points_expiration_schedule Note: To include more than one of these,
 *        use a comma-separated list, for example: detail,coupons,reward_stats
 * @output success : Boolean
 * @output data : String
 * @output errorMessage : String
 */
'use strict';

var CustomerShowService = require('../helper/service/CustomerShowService');
var LpResponse = require('../helper/model/LpResponse');
var Util = require('../helper/util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "ShowCustomer.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.emailAddress, args.include);
	args.success = response.success;
	args.data = response.data;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, emailAddress, include) {
	var response = {};
	var validationResult = {};
	try {
		validationResult.success = !empty(externalCustomerId) || !empty(emailAddress);
		if (!validationResult.success) {
			validationResult.errorMessage = "Either externalCustomerId or emailAddress is required.";
			return validationResult;
		}
		var result = CustomerShowService.run(emailAddress, externalCustomerId, include);
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