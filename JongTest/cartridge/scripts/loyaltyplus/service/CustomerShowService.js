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

exports.run = function (externalCustomerId, include) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_SHOW,
        requestMethod : 'GET',
        requestParam  : getRequestParam(externalCustomerId, include)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(externalCustomerId, include) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    if (externalCustomerId) requestParam.external_customer_id = externalCustomerId;
    if (include) requestParam.include = include;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}