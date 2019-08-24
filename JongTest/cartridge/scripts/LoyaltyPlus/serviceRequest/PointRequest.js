'use strict';

var Util = require('../util/Util');
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

exports.getPointsValueRequest = function () {
    var request = {uuid : CustomPreference.ACCOUNT_ID};
    request.sig = Util.getSignature(request);
    
    return request;
}
