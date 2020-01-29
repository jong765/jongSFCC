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

var RejectEventService = require('../helper/service/RejectEventService');
var EventType = require('../helper/util/LoyaltyPlusConstants').EventType;
var OrderMgr = require('dw/order/OrderMgr');
var LpResponse = require('../helper/model/LpResponse');
var Util = require('../helper/util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "RejectPurchase.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.orderNo);
	args.success = response.success;
	args.data = response.data;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, orderNo) {
	var response = {};
	var eventType = EventType.PURCHASE;
	try {
		var validationResult = {
			success : false
		};
		validationResult = Util.validateRequiredParams({
			'externalCustomerId' : externalCustomerId,
			'orderNo' : orderNo
		});
		if (!validationResult.success) {
			return validationResult;
		}
		var order = OrderMgr.getOrder(orderNo);
		var result = RejectEventService.run(externalCustomerId, eventType, orderNo);
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