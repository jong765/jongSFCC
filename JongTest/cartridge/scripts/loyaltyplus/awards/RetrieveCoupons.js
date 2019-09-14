/********************************************************************************************
 * RetrieveCoupons.js
 * 
 *  Description :   Retrieve customer coupons and calculate total rewards.
 *  Author      :	Jong Kim
 *  Date        :   09/11/2019
 *
 *   @input emailAddress : String
 *   @output result : Object
 * 
 *  Modification log:
 * 
 * 
 ********************************************************************************************/

var CustomerShowService = require('../service/CustomerShowService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "RetrieveCoupons.js");

function execute(args) {
	var result = run(args.emailAddress);
	args.result = result;
    return result.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress) {
    try {
        var validationResult = Util.validateRequiredParams({'emailAddress':emailAddress});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = CustomerShowService.run(emailAddress, 'coupons').object;
        var couponArray = result.data.customer_coupons;
        if (couponArray) {
            return {success         :   result.success,
                    totalRewards    :   getTotalRewards(couponArray)
                   }
        } else {
            return {success     :   false
                   }
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return result;
}

function getTotalRewards(couponArray) {
    var rewardAmount = 0.00;
    for (var i=0; i<couponArray.length; i++){
        rewardAmount += couponArray[i];
    }
    return rewardAmount;
}

module.exports = {
    'execute': execute,
    'run': run
}