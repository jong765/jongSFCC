/**
 * LikeProduct.js
 * 
 * Record loyalty plus like_a_product event.
 * 
 * @input externalCustomerId : String
 * @input productId : String
 * @input marketingId : String
 * @output success : Boolean
 * @output data : Object
 * @output errorMessage : String
 */

var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "LikeProduct.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.productId, args.marketingId);
	args.success = response.success;
	args.data = response.data;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, productId, marketingId) {
	var RecordRequestParam = require('../helper/model/RecordRequestParam');
	var LpResponse = require('../helper/model/LpResponse');
	var response = {};
	try {
		var validationResult = {
			success : false
		};
		validationResult = require('../helper/util/Util').validateRequiredParams({
			'externalCustomerId' : externalCustomerId
		});
		if (!validationResult.success) {
			return validationResult;
		}
		var eventType = require('../helper/util/LoyaltyPlusConstants').EventType.LIKE_A_PRODUCT;
		var recordRequestParam = new RecordRequestParam(externalCustomerId, eventType, marketingId);
		recordRequestParam.setEventId(getEventId(externalCustomerId, productId, eventType));
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

function getEventId(externalCustomerId, productId, eventType) {
	return externalCustomerId + "_" + eventType + "_" + productId + "_"
			+ require('../helper/util/DateUtil').formatDate(new Date, "yyyyMMddhhmmss");
}

module.exports = {
	'execute' : execute,
	'run' : run
}