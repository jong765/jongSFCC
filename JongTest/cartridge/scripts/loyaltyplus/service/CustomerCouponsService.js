/**
 *  CustomerCouponsService.js
 * 
 *  Get coupons assigned to a customer.	
 */
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

exports.run = function (externalCustomerId) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_COUPONS,
        requestMethod : 'GET',
        requestParam  : getRequestParam(externalCustomerId)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam (externalCustomerId) {
	var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    requestParam.external_customer_id = externalCustomerId;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}