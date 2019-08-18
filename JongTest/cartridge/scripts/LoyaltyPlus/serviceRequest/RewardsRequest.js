'use strict';

const Util = require('../util/Util');
const CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

exports.getRewardsRequest = function () {
    let rewardsRequest = {
    	uuid	:	CustomPreference.ACCOUNT_ID
    };
    
    rewardsRequest.sig = Util.getSignature(rewardsRequest);
    
    return rewardsRequest;
}
