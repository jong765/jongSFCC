/**
 *  Purchase.js
 * 
 *  Record loyalty plus purchase event.
 * 
 *   @input lpExternalCustomerId : String
 *   @input orderNo : String
 *   @output responseObject : Object
 */

var RecordEventService = require('../service/RecordEventService');
var RecordRequestParam = require('../model/RecordRequestParam');
var EventType = require('../util/LoyaltyPlusConstants').EventType;
var OrderMgr = require('dw/order/OrderMgr');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "Purchase.js");

function execute(args) {
	var responseObject = run(args.lpExternalCustomerId, args.orderNo);
	args.responseObject = responseObject;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId, orderNo) {
    var responseObject = {};
    try {
        var validationResult = {success:false};
        validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId, 'orderNo':orderNo});
        if (!validationResult.success) {
            return validationResult;
        }
        var order = OrderMgr.getOrder(orderNo);
        responseObject = recordEvent(lpExternalCustomerId, order, order.custom.marketingId);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        responseObject = {success : false};
    }
    logger.debug("responseObject: " + JSON.stringify(responseObject));
    return responseObject;
}

function recordEvent(lpExternalCustomerId, order, marketingId) {
    var responseObject = {};
    var type = EventType.PURCHASE;
    try {
    	var recordRequestParam = new RecordRequestParam(lpExternalCustomerId, type, marketingId);
    	recordRequestParam.setValue(order.totalGrossPrice.value);
    	recordRequestParam.setEventId(order.orderNo);
        var result = RecordEventService.run(recordRequestParam).object;
        var data = result.data;
        if (data) {
            responseObject = {success : result.success,
                              points : data.points,
                              eventId : data.id};
        } else {
            responseObject = {success : false};
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        responseObject = {success : false};
    }
    return responseObject;
}

module.exports = {
    'execute': execute,
    'run': run
}