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

var RecordEventService = require('../helper/service/RecordEventService');
var RecordRequestParam = require('../helper/model/RecordRequestParam');
var EventType = require('../helper/util/LoyaltyPlusConstants').EventType;
var LpResponse = require('../helper/model/LpResponse');
var Util = require('../helper/util/Util');
var DateUtil = require('../helper/util/DateUtil');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "LogIntoLoyalty.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.marketingId);
	args.success = response.success;
	args.data = response.data;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, marketingId) {
	var response = {};
	try {
		var validationResult = Util.validateRequiredParams({
			'externalCustomerId' : externalCustomerId
		});
		if (!validationResult.success) {
			return validationResult;
		}
		var eventType = EventType.LOG_INTO_LOYALTY;
		var recordRequestParam = new RecordRequestParam(externalCustomerId, eventType, marketingId);
		recordRequestParam.setEventId(getEventId(externalCustomerId, eventType));
		var result = RecordEventService.run(recordRequestParam);
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
			+ DateUtil.formatDate(new Date, "yyyyMMddhhmmss");
}

module.exports = {
	'execute' : execute,
	'run' : run
}