/*******************************************************************************
 * PauseCustomer.js
 * 
 * Pause an active customer account. Either externalCustomerId or emailAddress
 * is required.
 * 
 * @input externalCustomerId : String
 * @input emailAddress : String
 * @output success : Boolean
 * @output data : Object
 * @output errorMessage : String
 */
'use strict';

var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "PauseCustomer.js");

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
			validationResult.errorMessage = "Either externalCustomerId or emailAddress is required.";
			return validationResult;
		}
		var result = require('../helper/service/CustomerPauseService').run(externalCustomerId, emailAddress);
		if (result.object) {
			response = new LpResponse(result.object.success, result.object.data, null);
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