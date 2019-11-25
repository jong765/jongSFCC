/********************************************************************************************
 *  GetRedeemedCustomerCoupons.js
 * 
 *  Get redeemed customer coupons.
 *
 *   @input externalCustomerId : String
 *   @output success : Boolean
 *   @output data : Object
 *   @output errorMessage : String
 */

var CustomerCouponsService = require('../helper/service/CustomerCouponsService');
var LpRedeemedCouponsResponse = require('../helper/model/LpRedeemedCouponsResponse');
var Util = require('../helper/util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "GetRedeemedCustomerCoupons.js");

function execute(args) {
	var response = run(args.externalCustomerId);
	args.success = response.success;
	args.offers = response.offers;
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
        var result = CustomerCouponsService.run(externalCustomerId);
        if (result.object) {
        	response = new LpRedeemedCouponsResponse(result.object.success, result.object.data, result.errorMessage);
        } else {
        	response = new LpRedeemedCouponsResponse(false, null, result.errorMessage);
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        response = new LpRedeemedCouponsResponse(false, null, errMessage);
    }
    logger.debug("response: " + JSON.stringify(response));
    return response;
}

module.exports = {
    'execute': execute,
    'run': run
}