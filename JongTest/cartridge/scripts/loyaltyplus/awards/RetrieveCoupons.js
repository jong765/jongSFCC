/********************************************************************************************
 *  RetrieveCoupons.js
 * 
 *  Retrieve customer coupons.
 *
 *   @input lpExtCustomerId : String
 *   @output responseObject : Object
 */

var CustomerCouponsService = require('../service/CustomerCouponsService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "RetrieveCoupons.js");

function execute(args) {
	var responseObject = run(args.lpExtCustomerId);
	args.responseObject = responseObject;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExtCustomerId) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'lpExtCustomerId':lpExtCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = CustomerCouponsService.run(lpExtCustomerId).object;
        var coupons = result.data;
        if (coupons) {
            responseObject = {success : result.success,
                              coupons : coupons,
                              totalRewards : getTotalRewards(coupons)};
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