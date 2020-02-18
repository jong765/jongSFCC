/*******************************************************************************
 * LookupCustomer.js
 * 
 * Search for customer by email address. Error if duplicate customer email
 * addresses are found.
 * 
 * @input emailAddress : String
 * @output success : Boolean
 * @output customerFound : Boolean
 * @output duplicateEmailsFound : Boolean
 * @output data : Object
 * @output errorMessage : String
 */
'use strict';

var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "LookupCustomer.js");

function execute(args) {
	var response = run(args.emailAddress);
	args.success = response.success;
	args.customerFound = response.customerFound;
	args.duplicateEmailsFound = response.duplicateEmailsFound;
	args.data = response.data;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress) {
	var LpResponse = require('../helper/model/LpResponse');
	var response = {};
	try {
		var validationResult = require('../helper/util/Util').validateRequiredParams({
			'emailAddress' : emailAddress
		});
		if (!validationResult.success) {
			return validationResult;
		}
		var result = require('../helper/service/CustomerSearchService').run(emailAddress);
		if (result.object) {
			if (result.object.data.length > 1) { // Error if duplicate email
				// addresses found.
				response = new LpResponse(false, null, "Error: Duplicate emails found.");
				response.customerFound = false;
				response.duplicateEmailsFound = true;
			} else {
				var data = result.object.data[0];
				if (data) {
					response = new LpResponse(result.object.success, data, result.errorMessage);
					response.customerFound = true;
					response.duplicateEmailsFound = false;
				} else {
					response = new LpResponse(result.object.success, null, result.errorMessage);
					response.customerFound = false;
					response.duplicateEmailsFound = false;
				}
			}
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