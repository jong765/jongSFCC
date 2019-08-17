'use strict';

const ServiceRegistry = require('dw/svc/ServiceRegistry');
const Status = require('dw/system/Status');
const Site = require('dw/system/Site');
const ApiRequest = require('../service/request/ApiRequest');
const Util = require('../util/Util');
const UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;

/**
 * Ping the LoyaltyPlus API server.
 *
 * @returns {Object}
 */
exports.ping = function () {
    let data = {
            urlPath       : UrlPath.PING,
            requestMethod : 'GET',
            request       : ApiRequest.getPingRequest()
        };

    let result = Util.callService(data);
    return result;
};

/**
 * Enroll a customer in the program.
 *
 * @param {String} accountId
 * @param {String} email
 * @param {String} customerId
 * @param {String} firstName
 * @param {String} lastName
 * @param {Object} address
 * @param (String) birthDate
 * @returns {Object}
 */
exports.enroll = function (accountId, email, customerId, firstName, lastName, address, birthDate) {
    let data = {
        urlPath       : UrlPath.ENROLL,
        requestMethod : 'POST',
        request       : ApiRequest.getEnrollRequest(accountId, email, customerId, firstName, lastName, address, birthDate)
    };

    let result = Util.callService(data);
    return result;
};

/**
 * Trigger a reward redemption. A 'reward' event will be recorded. 
 * If a trigger email has been configured, the reward trigger email will be sent.
 *
 * @param {String} accountId
 * @param {String} email
 * @param {String} rewardId
 * @returns {Object}
 */
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