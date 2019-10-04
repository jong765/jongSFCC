/**
 *  RecordPurchaseEvent.js
 * 
 *  Record loyalty plus purchase event.
 * 
 *   @input lpExternalCustomerId : String
 *   @input orderNo : String
 *   @output responseObject : Object
 */

var RecordEventService = require('../service/RecordEventService');
var OrderMgr = require('dw/order/OrderMgr');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "RecordPurchaseEvent.js");

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
        var result = RecordEventService.run(lpExternalCustomerId, "purchase", order, null, null, order.custom.marketingId).object;
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
    logger.debug("responseObject: " + JSON.stringify(responseObject));
    return responseObject;
}

module.exports = {
    'execute': execute,
    'run': run
}