/**
 *  RecordEvent.js
 * 
 *  Record loyalty plus event.
 * 
 *   @input lpExternalCustomerId : String
 *   @input eventType : String
 *   @input eventId : String
 *   @output responseObject : Object
 */

var RejectEventService = require('../service/RejectEventService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "RejectEvent.js");

function execute(args) {
	var responseObject = run(args.lpExternalCustomerId, args.eventType, args.eventId);
	args.responseObject = responseObject;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId, eventType, eventId) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId, 'eventType':eventType, 'eventId':eventId});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = RejectEventService.run(lpExternalCustomerId, eventType, eventId).object;
        var data = result.data;
        if (data) {
            responseObject = {success : result.success};
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