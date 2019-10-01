/********************************************************************************************
 *  UpdateAttributes.js
 * 
 *  Update the custom attributes of a member.
 *
 *   @input lpExternalCustomerId : String
 *   @input preferredStore : String
 *   @input shoppingPreference : String
 *   @output responseObject : Object
 */

var UpdateAttributesService = require('../service/UpdateAttributesService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "UpdateAttributes.js");

function execute(args) {
	var responseObject = run(args.lpExternalCustomerId, args.preferredStore, args.shoppingPreference);
    args.responseObject = responseObject;
    return result.responseObject ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId, preferredStore, shoppingPreference) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = UpdateAttributesService.run(lpExternalCustomerId, preferredStore, shoppingPreference).object;
        responseObject  = result? {success : result.success} : {success : false};
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