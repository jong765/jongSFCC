/********************************************************************************************
 *  UpdateShoppingPreference.js
 * 
 *  Update the ShoppingPreference custom attribute of a member.
 *
 *   @input lpExternalCustomerId : String
 *   @input shoppingPreference : String
 *   @output success : Boolean
 *   @output errorMessage : String
 */

var UpdateAttributesService = require('../helper/service/UpdateAttributesService');
var LpResponse = require('../helper/model/LpResponse');
var Util = require('../helper/util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "UpdateShoppingPreference.js");

function execute(args) {
	var response = run(args.lpExternalCustomerId, args.shoppingPreference);
    args.success = response.success;
    args.errorMessage = response.errorMessage;
    return result.response ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId, shoppingPreference) {
    var response = {};
    try {
        var validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = UpdateAttributesService.run(lpExternalCustomerId, 'replace', '/shopping_preference', shoppingPreference);
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