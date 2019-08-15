'use strict';

const TiersRequest = require('../service/request/TiersRequest');
const Util = require('../util/Util');
const UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;

exports.tiers = function (accountId) {
    let data = {
        urlPath       : UrlPath.TIERS,
        requestMethod : 'GET',
        request       : TiersRequest.getTiersRequest(accountId)
    };

    let result = Util.callService(data);
    return result;
};