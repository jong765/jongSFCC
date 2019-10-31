/**
 *  Purchase.js
 * 
 *  Record loyalty plus purchase event.
 * 
 *   @input externalCustomerId : String
 *   @input orderNo : String
 *   @output success : Boolean
 *   @output points : Number
 *   @output eventId : String
 */

var RecordEventService = require('../service/RecordEventService');
var RecordRequestParam = require('../model/RecordRequestParam');
var EventType = require('../util/LoyaltyPlusConstants').EventType;
var OrderMgr = require('dw/order/OrderMgr');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "Purchase.js");

function execute(args) {
	var responseObject = run(args.externalCustomerId, args.orderNo);
	args.success = responseObject.success;
	args.points = responseObject.points;
	args.eventId = responseObject.eventId;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, orderNo) {
    var responseObject = {};
    var type = EventType.PURCHASE;
    try {
        var validationResult = {success:false};
        validationResult = Util.validateRequiredParams({'externalCustomerId':externalCustomerId, 'orderNo':orderNo});
        if (!validationResult.success) {
            return validationResult;
        }
        var order = OrderMgr.getOrder(orderNo);
        var recordRequestParam = new RecordRequestParam(externalCustomerId, type, order.custom.marketingId);
    	recordRequestParam.setValue(order.adjustedMerchandizeTotalNetPrice.value);
    	recordRequestParam.setEventId(order.orderNo);
        var result = RecordEventService.run(recordRequestParam);
        if (result.object) {
        	var data = result.object.data;
            responseObject = {success : result.object.success,
                              points : data.points? data.points : null,
                              eventId : data.id? data.id : null,
                              errorMessage : data.message? data.message : null};
        } else {
            responseObject = {success : false,
            		          points : null,
            		          eventId : null,
            		          errorMessage : result.errorMessage};
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        responseObject = {success : false,
                          errorMessage : errMessage};
    }
    logger.debug("responseObject: " + JSON.stringify(responseObject));
    return responseObject;
}

module.exports = {
    'execute': execute,
    'run': run
}