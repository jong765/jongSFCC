'use strict';

var Util = require('../util/Util');
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

exports.getRewardsRequest = function () {
    var rewardsRequest = {
    	uuid	:	CustomPreference.ACCOUNT_ID
    };
    
    rewardsRequest.sig = Util.getSignature(rewardsRequest);
    
    return rewardsRequest;
}
