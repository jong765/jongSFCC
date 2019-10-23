/**
 *  RejectPurchase.js
 * 
 *  Reject loyalty plus purchase event.
 * 
 *   @input externalCustomerId : String
 *   @input orderNo : String
 *   @output success : Boolean
 *   @output errorMessage : String
 */

var RejectEventService = require('../service/RejectEventService');
var EventType = require('../util/LoyaltyPlusConstants').EventType;
var OrderMgr = require('dw/order/OrderMgr');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "RejectPurchase.js");

function execute(args) {
	var responseObject = run(args.externalCustomerId, args.orderNo);
	args.success = responseObject.success;
    args.errorMessage = responseObject.errorMessage;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, orderNo) {
    var responseObject = {};
    var eventType = EventType.PURCHASE;
    try {
        var validationResult = {success:false};
        validationResult = Util.validateRequiredParams({'externalCustomerId':externalCustomerId, 'orderNo':orderNo});
        if (!validationResult.success) {
            return validationResult;
        }
        var order = OrderMgr.getOrder(orderNo);
        var result = RejectEventService.run(externalCustomerId, eventType, orderNo);
        if (result.object) {
        	var data = result.object.data;
            responseObject = {success : result.object.success,
                              errorMessage : data && data.message? data.message : null};
        } else {
            responseObject = {success : false,
            		          errorMessage : result.errorMessage};
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        responseObject = {success : false,
                          errorMessage : errMessage}
    }
    logger.debug("responseObject: " + JSON.stringify(responseObject));
    return responseObject;
}

module.exports = {
    'execute': execute,
    'run': run
}