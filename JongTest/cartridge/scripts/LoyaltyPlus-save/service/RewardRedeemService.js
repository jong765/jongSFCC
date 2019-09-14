'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var Constant = require('../util/LoyaltyPlusConstants').Constant;

/**
 * Get customer information.
 */
exports.run = function (emailAddress, extCustomerId, rewardId, detail) {
    var data = {
        urlPath       : UrlPath.REWARD_REDEEM,
        requestMethod : 'POST',
        requestParam  : getRequestParam(emailAddress, extCustomerId, rewardId, detail)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(emailAddress, extCustomerId, rewardId, detail) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    requestParam.channel = Constant.CHANNEL;
    if (emailAddress) requestParam.email = emailAddress;
    if (extCustomerId) requestParam.external_customer_id = extCustomerId;
    if (rewardId) requestParam.reward_id = rewardId;
    if (detail) requestParam.detail = detail;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}