/**
 * GetCustomerPointRuleGroups.js
 * 
 * Get the full detail of all point rules available to the customer, grouped by
 * the point rule group. Either externalCustomerId or emailAddress is required.
 * 
 * @input externalCustomerId : String
 * @input emailAddress : String
 * @output success : Boolean
 * @output data : Object
 * @output errorMessage : String
 */

var CustomerPointRuleGroupsService = require('../helper/service/CustomerPointRuleGroupsService');
var LpResponse = require('../helper/model/LpResponse');
var Util = require('../helper/util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error",
		"GetCustomerPointRuleGroups.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.emailAddress);
	args.success = response.success;
	args.data = response.data;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, emailAddress) {
	var response = {};
	var validationResult = {};
	try {
		validationResult.success = !empty(externalCustomerId) || !empty(emailAddress);
		if (!validationResult.success) {
			validationResult.errorMessage = "Either externalCustomerId or emailAddress is required.";
			return validationResult;
		}
		var result = CustomerPointRuleGroupsService.run(externalCustomerId, emailAddress).object;
		var data = result.data;
		if (data) {
			response = new LpResponse(result.success, data, result.errorMessage);
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