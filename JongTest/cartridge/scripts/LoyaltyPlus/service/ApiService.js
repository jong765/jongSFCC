'use strict';

const ServiceRegistry = require('dw/svc/ServiceRegistry');
const Status = require('dw/system/Status');
const Site = require('dw/system/Site');
const ApiRequest = require('../request/ApiRequest');
const Util = require('../util/Util');
const UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;

exports.enroll = function (accountId, email, customerId, firstName, lastName, address, birthDate) {
    let data = {
        urlPath       : UrlPath.ENROLL,
        requestMethod : 'POST',
        request       : ApiRequest.getEnrollRequest(accountId, email, customerId, firstName, lastName, address, birthDate)
    };

    let result = Util.callService(data);
    return result;
};

exports.rewardRedeem = function (accountId, email, rewardId) {
    let data = {
        urlPath       : UrlPath.REWARD_REDEEM,
        requestMethod : 'POST',
        request       : ApiRequest.getRewardRedeemRequest(accountId, email, rewardId)
    };

    let result = Util.callService(data);
    return result;
};

exports.setSubscriptionType = function (accountId, email, customerId, subscriptionType) {
    let data = {
        urlPath       : UrlPath.SET_SUBSCRIPTION_TYPE,
        requestMethod : 'POST',
        request       : ApiRequest.getSetSubscriptionTypeRequest(accountId, email, customerId, subscriptionType)
    };

    let result = Util.callService(data);
    return result;
};