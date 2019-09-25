/**
 *  CustomerCouponsService.js
 * 
 *  Get coupons assigned to a customer.	
 */
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

exports.run = function (lpExternalCustomerId) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_COUPONS,
        requestMethod : 'GET',
        requestParam  : getRequestParam(lpExternalCustomerId)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam (lpExternalCustomerId) {
	var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    if (lpExternalCustomerId) requestParam.external_customer_id = lpExternalCustomerId;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}