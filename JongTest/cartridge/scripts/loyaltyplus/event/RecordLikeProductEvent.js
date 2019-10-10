/**
 *  RecordLikeProductEvent.js
 * 
 *  Record loyalty plus complete_profile event.
 * 
 *   @input lpExternalCustomerId : String
 *   @input marketingId : String
 *   @output responseObject : Object
 */

var RecordEventService = require('../service/RecordEventService');
var GetCustomerEvents = require('../customerRequest/GetCustomerEvents');
var OrderMgr = require('dw/order/OrderMgr');
var Util = require('../util/Util');
var DateUtil = require('../util/DateUtil');
var Constant = require('../util/LoyaltyPlusConstants').Constant;
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "RecordLikeProductEvent.js");

function execute(args) {
	var responseObject = run(args.lpExternalCustomerId, args.marketingId);
	args.responseObject = responseObject;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId, marketingId) {
    var responseObject = {};
    try {
        var validationResult = {success:false};
        validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        if (getLikeProductCountLP(lpExternalCustomerId) < Constant.LIKE_PRODUCT_LIMIT_PER_MONTH) {
	        var result = RecordEventService.run(lpExternalCustomerId, "like_a_product", null, null, null, marketingId).object;
	        var data = result.data;
	        if (data) {
	            responseObject = {success : result.success,
	                              points : data.points,
	                              eventId : data.id};
	        } else {
	            responseObject = {success : false};
	        }
        } else {
        		responseObject = {success : true};
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

function getLikeProductCountLP(lpExternalCustomerId) {
	var returnCount = 99999;
	var eventType = "like_a_product";
	var dateFilter = "created_at";
	var afterDate = DateUtil.formatDate(DateUtil.addDays(new Date(), -30), "yyyy-MM-dd'T'HH:MM:ss");
	var result = GetCustomerEvents.run(lpExternalCustomerId, eventType, dateFilter, afterDate, null, null);
	if (result.success) {
		returnCount = result.data.length;
	}
	logger.debug("likeProductCountLP: " + returnCount);
	return returnCount;
}

module.exports = {
    'execute': execute,
    'run': run
}