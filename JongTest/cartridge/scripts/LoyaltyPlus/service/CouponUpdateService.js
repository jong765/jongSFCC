'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

/**
 * Get customer information.
 */
exports.run = function (emailAddress, extCustomerId, vendor, vendorId, include) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_SHOW,
        requestMethod : 'GET',
        requestParam  : getRequestParam(emailAddress, extCustomerId, vendor, vendorId, include)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(emailAddress, extCustomerId, vendor, vendorId, include) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    if (emailAddress) requestParam.email = emailAddress;
    if (extCustomerId) requestParam.external_customer_id = extCustomerId;
    if (vendor) requestParam.vendor = vendor;
    if (vendorId) requestParam.vedor_id = vendorId;
    if (include) requestParam.include = include;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}