/********************************************************************************************
 *  UpdatePreferredStore.js
 * 
 *  Update the PreferredStore custom attribute of a member.
 *
 *   @input lpExternalCustomerId : String
 *   @input preferredStore : String
 *   @output success : Boolean
 *   @output errorMessage : String
 */

var UpdateAttributesService = require('../helper/service/UpdateAttributesService');
var LpResponse = require('../helper/model/LpResponse');
var Util = require('../helper/util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "UpdatePreferredStore.js");

function execute(args) {
	var response = run(args.lpExternalCustomerId, args.preferredStore);
    args.success = response.success;
    args.errorMessage = response.errorMessage;
    return result.response ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId, preferredStore) {
    var response = {};
    try {
        var validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = UpdateAttributesService.run(lpExternalCustomerId, 'replace', '/pref_store', preferredStore);
        if (result.object) {
    		response = new LpResponse(result.object.success, null, result.errorMessage);
        } else {
        	response = new LpResponse(false, null, result.errorMessage);
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        response = new LpResponse(false, null, errMessage);
    }
    logger.debug("response: " + JSON.stringify(response));
    return response;
}

module.exports = {
    'execute': execute,
    'run': run
}