/**
 *  LikeProduct.js
 * 
 *  Record loyalty plus like_a_product event.
 * 
 *   @input lpExternalCustomerId : String
 *   @input marketingId : String
 *   @output responseObject : Object
 */

var RecordEventService = require('../service/RecordEventService');
var GetCustomerEvents = require('../customerRequest/GetCustomerEvents');
var RecordRequestParam = require('../model/RecordRequestParam');
var EventType = require('../util/LoyaltyPlusConstants').EventType;
var Util = require('../util/Util');
var DateUtil = require('../util/DateUtil');
var Constant = require('../util/LoyaltyPlusConstants').Constant;
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "LikeProduct.js");

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
        	responseObject = recordEvent(lpExternalCustomerId, marketingId);
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

function recordEvent(lpExternalCustomerId, marketingId) {
    var responseObject = {};
    var type = EventType.LIKE_A_PRODUCT;
    try {
        var result = RecordEventService.run(new RecordRequestParam(lpExternalCustomerId, type, marketingId)).object;
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