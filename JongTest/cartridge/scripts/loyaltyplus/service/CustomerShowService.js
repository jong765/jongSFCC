/**
 *  CustomerShowService.js
 * 
 *  Get customer information.	
 */
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "CustomerShowService.js");

exports.run = function (lpExternalCustomerId, include) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_SHOW,
        requestMethod : 'GET',
        requestParam  : getRequestParam(lpExternalCustomerId, include)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(lpExternalCustomerId, include) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    if (lpExternalCustomerId) requestParam.external_customer_id = lpExternalCustomerId;
    if (include) requestParam.include = include;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}