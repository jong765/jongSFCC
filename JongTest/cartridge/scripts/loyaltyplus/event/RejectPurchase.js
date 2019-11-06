/**
 *  RejectPurchase.js
 * 
 *  Reject loyalty plus purchase event.
 * 
 *   @input externalCustomerId : String
 *   @input orderNo : String
 *   @output success : Boolean
 *   @output data : Object
 *   @output errorMessage : String
 */

var RejectEventService = require('../service/RejectEventService');
var EventType = require('../util/LoyaltyPlusConstants').EventType;
var OrderMgr = require('dw/order/OrderMgr');
var Util = require('../util/Util');
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
        var validationResult = {success:false};
        validationResult = Util.validateRequiredParams({'externalCustomerId':externalCustomerId, 'orderNo':orderNo});
        if (!validationResult.success) {
            return validationResult;
        }
        var order = OrderMgr.getOrder(orderNo);
        var result = RejectEventService.run(externalCustomerId, eventType, orderNo);
        if (result.object) {
        	var data = result.object.data;
            response = {success : result.object.success,
            		    data : result.object.data,
                        errorMessage : data && data.message? data.message : null};
        } else {
            response = {success : false,
            		    data : null,
            		    errorMessage : result.errorMessage};
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        response = {success : false,
        		    data : null,
                    errorMessage : errMessage}
    }
    logger.debug("response: " + JSON.stringify(response));
    return response;
}

module.exports = {
    'execute': execute,
    'run': run
}