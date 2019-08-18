'use strict';

var ServiceRegistry = require('dw/svc/ServiceRegistry');
var Status = require('dw/system/Status');
var Site = require('dw/system/Site');
var ApiRequest = require('../serviceRequest/ApiRequest');
var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;

/**
 * Ping the LoyaltyPlus API server.
 *
 * @returns {Object}
 */
exports.ping = function () {
    var data = {
            urlPath       : UrlPath.PING,
            requestMethod : 'GET',
            request       : ApiRequest.getPingRequest()
    };

    var result = Util.callService(data);
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
exports.enroll = function (email, customerId, firstName, lastName, address, birthDate) {
    var data = {
        urlPath       : UrlPath.ENROLL,
        requestMethod : 'POST',
        request       : ApiRequest.getEnrollRequest(email, customerId, firstName, lastName, address, birthDate)
    };

    var result = Util.callService(data);
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
    var data = {
        urlPath       : UrlPath.REWARD_REDEEM,
        requestMethod : 'POST',
        request       : ApiRequest.getRewardRedeemRequest(accountId, email, rewardId)
    };

    var result = Util.callService(data);
    return result;
};

exports.setSubscriptionType = function (accountId, email, customerId, subscriptionType) {
    var data = {
        urlPath       : UrlPath.SET_SUBSCRIPTION_TYPE,
        requestMethod : 'POST',
        request       : ApiRequest.getSetSubscriptionTypeRequest(accountId, email, customerId, subscriptionType)
    };

    var result = Util.callService(data);
    return result;
};