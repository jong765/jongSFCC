/**
 *  RecordEvent.js
 * 
 *  Record loyalty plus event.
 * 
 *   @input lpExternalCustomerId : String
 *   @input eventType : String
 *     valid event types:
 *         Enrollment
 *         Purchase
 *         Signup
 *         Complete_profile
 *         Like_a_product
 *         Log_into_loyalty
 *         Preferred_store
 *   @input orderNo : String
 *   @output responseObject : Object
 */

var RecordService = require('../service/RecordService');
var OrderMgr = require('dw/order/OrderMgr');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "RecordEvent.js");

function execute(args) {
	var responseObject = run(args.lpExternalCustomerId, args.eventType, args.orderNo);
	args.responseObject = responseObject;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId, eventType, orderNo) {
    var responseObject = {};
    try {
        var validationResult = {success:false};
        if (eventType.equalsIgnoreCase("Purchase")) {
            validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId, 'eventType':eventType, 'orderNo':orderNo});
        } else {
            validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId, 'eventType':eventType});
        }
        if (!validationResult.success) {
            return validationResult;
        }
        var order = OrderMgr.getOrder(orderNo);
        var result = RecordService.run(lpExternalCustomerId, eventType, order).object;
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