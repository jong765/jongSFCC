/********************************************************************************************
 *  GetCustomerCoupons.js
 * 
 *  Retrieve customer coupons.
 *
 *   @input externalCustomerId : String
 *   @output success : Boolean
 *   @output coupons : Object
 *   @output totalRewards : Number
 */

var CustomerCouponsService = require('../service/CustomerCouponsService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "GetCustomerCoupons.js");

function execute(args) {
	var responseObject = run(args.externalCustomerId);
	args.responseObject = responseObject;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'externalCustomerId':externalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = CustomerCouponsService.run(externalCustomerId);
        if (result.object) {
            responseObject = {success : result.object.success,
                              coupons : result.object.data,
                              totalRewards : getTotalRewards(result.object.data),
                              errorMessage : null};
        } else {
            responseObject = {success : false,
            		          errorMessage : result.errorMessage};
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        responseObject = {success : false,
		                  errorMessage : errMessage};
    }
    logger.debug("responseObject: " + JSON.stringify(responseObject));
    return responseObject;
}

function getTotalRewards(coupons) {
    var rewardAmount = 0.00;
    for (var i=0; i<coupons.length; i++){
        if (coupons[i].status.equalsIgnoreCase("redeemed")) {
            rewardAmount += coupons[i];
        }
    }
    return rewardAmount;
}

module.exports = {
    'execute': execute,
    'run': run
}