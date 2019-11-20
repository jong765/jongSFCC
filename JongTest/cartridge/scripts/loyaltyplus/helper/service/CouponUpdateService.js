/**
 *  CouponUpdateService.js
 * 
 *  Update status of a coupon code.
 */
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

exports.run = function (couponCode, status) {
    var data = {
        urlPath       : UrlPath.COUPON_UPDATE,
        requestMethod : 'GET',
        requestParam  : getRequestParam(couponCode, status)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam (couponCode, status) {
	var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    if (couponCode) requestParam.code = couponCode;
    if (status) requestParam.status = status;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}