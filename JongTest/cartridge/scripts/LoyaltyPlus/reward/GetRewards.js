/**
 * GetRewards.js
 * 
 *  Get all rewards.
 *
 *   @output rewards : dw.util.ArrayList
 *   
 */

var RewardsService = require('../service/RewardsService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "GetRewards.js");

function execute(args) {
	var rewardsResponse = rewards(args);
    args.rewards = rewardsResponse.rewards;
    return rewardsResponse.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function rewards(args) {
    var rewardsResponse = {
    	success 	: 	false,
    	rewards 	: 	new dw.util.ArrayList()
    };

    try {
    	var result = RewardsService.rewards().object;
    	rewardsResponse.success = result.success;
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return rewardsResponse;
}

module.exports = {
    'execute': execute,
    'rewards': rewards
}