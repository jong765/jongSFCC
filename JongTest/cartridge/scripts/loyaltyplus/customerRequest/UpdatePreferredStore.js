/********************************************************************************************
 *  UpdatePreferredStore.js
 * 
 *  Update the PreferredStore custom attribute of a member.
 *
 *   @input lpExternalCustomerId : String
 *   @input preferredStore : String
 *   @output responseObject : Object
 */

var UpdateAttributesService = require('../service/UpdateAttributesService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "UpdatePreferredStore.js");

function execute(args) {
	var responseObject = run(args.lpExternalCustomerId, args.preferredStore);
    args.responseObject = responseObject;
    return result.responseObject ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId, preferredStore) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = UpdateAttributesService.run(lpExternalCustomerId, 'replace', '/pref_store', preferredStore).object;
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