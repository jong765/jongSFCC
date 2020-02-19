/**
 * RejectPurchase.js
 * 
 * Reject loyalty plus purchase event.
 * 
 * @input externalCustomerId : String
 * @input orderNo : String
 * @output success : Boolean
 * @output data : Object
 * @output errorMessage : String
 */

var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "RejectPurchase.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.orderNo);
	args.success = response.success;
	args.data = response.data;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, orderNo) {
	var LpResponse = require('../helper/model/LpResponse');
	var eventType = require('../helper/util/LoyaltyPlusConstants').EventType.PURCHASE;
	var response = {};
	try {
		var validationResult = {
			success : false
		};
		validationResult = require('../helper/util/Util').validateRequiredParams({
			'externalCustomerId' : externalCustomerId,
			'orderNo' : orderNo
		});
		if (!validationResult.success) {
			return validationResult;
		}
		var order = require('dw/order/OrderMgr').getOrder(orderNo);
		var result = require('../helper/service/RejectEventService').run(externalCustomerId, eventType, orderNo);
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