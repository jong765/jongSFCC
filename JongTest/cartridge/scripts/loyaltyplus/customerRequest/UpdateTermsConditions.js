/*******************************************************************************
 * UpdateTermsConditions.js
 * 
 * Update the accepted terms and conditions custom attribute of a member. Either
 * externalCustomerId or emailAddress is required.
 * 
 * @input externalCustomerId : String
 * @input emailAddress : String
 * @input acceptedTermsConditions : Boolean
 * @output success : Boolean
 * @output errorMessage : String
 */

var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "UpdateTermsConditions.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.emailAddress, args.acceptedTermsConditions);
	args.success = response.success;
	args.errorMessage = response.errorMessage;
	return result.response ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, emailAddress, acceptedTermsConditions) {
	var LpResponse = require('../helper/model/LpResponse');
	var response = {};
	var validationResult = {};
	try {
		validationResult.success = !empty(externalCustomerId) || !empty(emailAddress);
		if (!validationResult.success) {
			validationResult.errorMessage = "Either externalCustomerId or emailAddress is required.";
			return validationResult;
		}
		var result = require('../helper/service/UpdateAttributesService').run(externalCustomerId, emailAddress, 'replace',
				'/accepted_terms_and_conditions', acceptedTermsConditions);
		if (result.object) {
			response = new LpResponse(result.object.success, null, result.errorMessage);
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