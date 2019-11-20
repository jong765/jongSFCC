/********************************************************************************************
 *  GetRedeemedCoupons.js
 * 
 *  Retrieve redeemed customer coupons. 
 *  Used coupons will not be retrieved.
 *
 *   @input externalCustomerId : String
 *   @output success : Boolean
 *   @output data : Object
 *   @output errorMessage : String
 */

var CustomerOffersService = require('../helper/service/CustomerOffersService');
var LpResponse = require('../helper/model/LpResponse');
var Util = require('../helper/util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "GetCustomerOffers.js");

function execute(args) {
	var response = run(args.externalCustomerId);
	args.success = response.success;
	args.data = response.data;
	args.errorMessage = response.errorMessage;
    return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId) {
    var response = {};
    try {
        var validationResult = Util.validateRequiredParams({'externalCustomerId':externalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = CustomerOffersService.run(externalCustomerId);
        if (result.object) {
        	response = new LpResponse(result.object.success, result.object.data, result.errorMessage);
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