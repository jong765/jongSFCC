'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

/**
 * Get the points value, e.g. points to dollars conversion rate. This is only relevant for accounts who use a
 * points at checkout reward system.
 */
exports.pointsValue = function () {
    var data = {
        urlPath       : UrlPath.POINTS_VALUE,
        requestMethod : 'GET',
        request       : getPointsValueRequest()
    };

    var result = Util.callService(data);
    var response = {"success":result.object.success, "conversionRate":result.object.conversion_rate};
    return response;
};

function getPointsValueRequest() {
    var request = {uuid : CustomPreference.ACCOUNT_ID};
    request.sig = Util.getSignature(request);
    
    return request;
}