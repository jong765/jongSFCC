/**
 *  CustomerReactivateService.js
 * 
 *  Set customer status to active. 
 *  Customers who are active can accrue points and will receive program communications.
 */
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "CustomerReactivateService.js");

exports.run = function (externalCustomerId) {
    var data = {
        urlPath       : UrlPath.REACTIVATE,
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