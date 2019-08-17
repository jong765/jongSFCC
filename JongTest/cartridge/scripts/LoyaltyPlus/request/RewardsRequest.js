'use strict';

const Util = require('../util/Util');

exports.getRewardsRequest = function (accountId) {
    let rewardsRequest = {
    	uuid	:	accountId
    };
    
    rewardsRequest.sig = Util.getSignature(rewardsRequest);
    
    return rewardsRequest;
}
