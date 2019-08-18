'use strict';

var TiersRequest = require('../serviceRequest/TiersRequest');
var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;

exports.tiers = function (accountId) {
    var data = {
        urlPath       : UrlPath.TIERS,
        requestMethod : 'GET',
        request       : TiersRequest.getTiersRequest(accountId)
    };

    var result = Util.callService(data);
    return result;
};