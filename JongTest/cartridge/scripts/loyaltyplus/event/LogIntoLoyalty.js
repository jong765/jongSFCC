/*******************************************************************************
 * LogIntoLoyalty.js
 * 
 * Take care of processes when customer log into loyalty.
 * 
 * @input externalCustomerId : String (Required)
 * @input marketingId : String
 * @output success : Boolean
 * @output data : Object
 * @output errorMessage : String
 */

var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "LogIntoLoyalty.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.marketingId);
	args.success = response.success;
	args.data = response.data;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, marketingId) {
	var RecordRequestParam = require('../helper/model/RecordRequestParam');
	var LpResponse = require('../helper/model/LpResponse');
	var response = {};
	try {
		var validationResult = require('../helper/util/Util').validateRequiredParams({
			'externalCustomerId' : externalCustomerId
		});
		if (!validationResult.success) {
			return validationResult;
		}
		var eventType = require('../helper/util/LoyaltyPlusConstants').EventType.LOG_INTO_LOYALTY;
		var recordRequestParam = new RecordRequestParam(externalCustomerId, eventType, marketingId);
		recordRequestParam.setEventId(getEventId(externalCustomerId, eventType));
		var result = require('../helper/service/RecordEventService').run(recordRequestParam);
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

function getEventId(externalCustomerId, eventType) {
	return externalCustomerId + "_" + eventType + "_"
			+ require('../helper/util/DateUtil').formatDate(new Date, "yyyyMMddhhmmss");
}

module.exports = {
	'execute' : execute,
	'run' : run
}