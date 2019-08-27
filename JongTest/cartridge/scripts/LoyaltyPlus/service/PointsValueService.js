'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

/**
 * Get the points value, e.g. points to dollars conversion rate. This is only relevant for accounts who use a
 * points at checkout reward system.
 */
exports.run = function () {
    var data = {
        urlPath       : UrlPath.POINTS_VALUE,
        requestMethod : 'GET',
        requestParam  : getRequestParam()
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam() {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}