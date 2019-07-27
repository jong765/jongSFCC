'use strict';

const ServiceRegistry = require('dw/svc/ServiceRegistry');
const Status = require('dw/system/Status');
const Site = require('dw/system/Site');
const RewardsRequest = require('../request/RewardsRequest');
const Util = require('../util/Util');
const UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;

exports.rewards = function (accountId) {
    let data = {
        urlPath       : UrlPath.REWARDS,
        requestMethod : 'GET',
        request       : RewardsRequest.getRewardsRequest(accountId)
    };

    let result = Util.callService(data);
    return result;
};