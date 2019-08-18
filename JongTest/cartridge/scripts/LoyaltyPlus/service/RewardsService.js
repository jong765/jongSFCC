'use strict';

const ServiceRegistry = require('dw/svc/ServiceRegistry');
const Status = require('dw/system/Status');
const Site = require('dw/system/Site');
const RewardsRequest = require('../serviceRequest/RewardsRequest');
const Util = require('../util/Util');
const UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;

exports.rewards = function () {
    let data = {
        urlPath       : UrlPath.REWARDS,
        requestMethod : 'GET',
        request       : RewardsRequest.getRewardsRequest()
    };

    let result = Util.callService(data);
    return result;
};