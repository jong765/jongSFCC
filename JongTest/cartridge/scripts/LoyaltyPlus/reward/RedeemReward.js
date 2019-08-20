/**
 * redeemReward.js
 * 
 *  Trigger a reward redemption. A 'reward' event will be recorded. If a trigger email has been configured, the
 *  reward trigger email will be sent.
 *
 *   @input emailAddress : String
 *   @input extCustomerId : String
 *   @input rewardId : String
 * 
 */

var ApiService = require('../service/ApiService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "RedeemReward.js");

function execute(args) {
	var redeemRewardResponse = redeemReward(args);
    return redeemRewardResponse.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function redeemReward(args) {
    var redeemRewardResponse = {
    	success 		: 	false
    };

    try {
    	var result = ApiService.redeemReward(args.emailAddress, args.extCustomerId, args.rewardId);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return redeemRewardResponse;
}

module.exports = {
    'execute': execute,
    'redeemReward': redeemReward
}