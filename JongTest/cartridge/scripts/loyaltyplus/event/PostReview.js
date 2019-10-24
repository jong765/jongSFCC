/**
 *  PostReview.js
 * 
 *  Record loyalty plus review event.
 * 
 *   @input externalCustomerId : String
 *   @input marketingId : String
 *   @output success : Boolean
 *   @output points : Number
 *   @output eventId : String
 *   @output errorMessage : String
 */

var RecordEventService = require('../service/RecordEventService');
var GetCustomerEvents = require('../customerRequest/GetCustomerEvents');
var RecordRequestParam = require('../model/RecordRequestParam');
var EventType = require('../util/LoyaltyPlusConstants').EventType;
var Util = require('../util/Util');
var DateUtil = require('../util/DateUtil');
var Constant = require('../util/LoyaltyPlusConstants').Constant;
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "PostReview.js");

function execute(args) {
	var responseObject = run(args.externalCustomerId, args.marketingId);
	args.success = responseObject.success;
	args.points = responseObject.points;
	args.eventId = responseObject.eventId;
	args.errorMessage = responseObject.errorMessage;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, marketingId) {
    var responseObject = {};
    try {
        var validationResult = {success:false};
        validationResult = Util.validateRequiredParams({'externalCustomerId':externalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var eventType = EventType.REVIEW;
    	var result = RecordEventService.run(new RecordRequestParam(externalCustomerId, eventType, marketingId));
    	if (result.object) {
            responseObject = {success : result.object.success,
            				  points : result.object.data.points,
                              eventId : result.object.data.id,
                              errorMessage : result.object.data.message};
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
		                  points : null,
		                  eventId : null,
                          errorMessage : errMessage};
    }
    logger.debug("responseObject: " + JSON.stringify(responseObject));
    return responseObject;
}

module.exports = {
    'execute': execute,
    'run': run
}