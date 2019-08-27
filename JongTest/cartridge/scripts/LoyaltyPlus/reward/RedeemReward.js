/**
 * RewardRedeemService
 * 
 *  Trigger a reward redemption. A 'reward' event will be recorded. If a trigger email has been configured, the
 *  reward trigger email will be sent.
 *
 *   @input emailAddress : String
 *   @input extCustomerId : String
 *   @input rewardId : String
 *   @input detail : String
 *   @output result : Object
 * 
 */

var RewardRedeemService = require('../service/RewardRedeemService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "RedeemReward.js");

function execute(args) {
	var result = run(args.emailAddress, args.extCustomerId, args.rewardId, args.detail);
    args.result = result;
    return result.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress, extCustomerId, vendor, vendorId, include) {
    var result = null;

    try {
    	result = CustomerShowService.run(emailAddress, extCustomerId, rewardId, detail);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return result;
}

module.exports = {
    'execute': execute,
    'run': run
}