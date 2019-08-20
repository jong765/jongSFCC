'use strict';

var Status = require('dw/system/Status');
var Site = require('dw/system/Site');
var RewardsRequest = require('../serviceRequest/RewardsRequest');
var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;

exports.rewards = function () {
    var data = {
        urlPath       : UrlPath.REWARDS,
        requestMethod : 'GET',
        request       : RewardsRequest.getRewardsRequest()
    };

    var result = Util.callService(data);
    return result;
};