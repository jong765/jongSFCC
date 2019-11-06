/********************************************************************************************
 *  CheckIn.js
 * 
 *  Take care of processes when customer checks in.
 *
 *   @input externalCustomerId : String
 *   @input marketingId : String
 *   @output success : Boolean
 *   @output data : Object
 *   @output errorMessage : String
 */

var GetCustomerEvents = require('../customerRequest/GetCustomerEvents');
var RecordEventService = require('../service/RecordEventService');
var RecordRequestParam = require('../model/RecordRequestParam');
var EventType = require('../util/LoyaltyPlusConstants').EventType;
var Util = require('../util/Util');
var DateUtil = require('../util/DateUtil');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "CheckIn.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.marketingId);
    args.success = response.success;
    args.data = response.data;
    args.errorMessage = response.errorMessage;
    return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, marketingId) {
    var response = {};
    try {
        var validationResult = Util.validateRequiredParams({'externalCustomerId':externalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var eventType = EventType.CHECK_IN;
    	var result = RecordEventService.run(new RecordRequestParam(externalCustomerId, eventType, marketingId));
    	if (result.object) {
            response = {success : result.object.success,
            		    data : result.object.data,
            		    errorMessage : result.errorMessage};
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
                    errorMessage : errMessage};
    }
    logger.debug("response: " + JSON.stringify(response));
    return response;
}

module.exports = {
    'execute': execute,
    'run': run
}