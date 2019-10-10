/**
 *  RecordCompleteProfileEvent.js
 * 
 *  Record loyalty plus complete_profile event.
 * 
 *   @input lpExternalCustomerId : String
 *   @input marketingId : String
 *   @output responseObject : Object
 */

var RecordEventService = require('../service/RecordEventService');
var OrderMgr = require('dw/order/OrderMgr');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "RecordCompleteProfileEvent.js");

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
        var result = RecordEventService.run(lpExternalCustomerId, "complete_profile", null, null, null, marketingId).object;
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