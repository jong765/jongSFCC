/**
 *  CustomerPauseService.js
 * 
 *  Set customer status to pause. 
 *  A paused member will stop accruing points and will not receive program communications.
 */
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "CustomerPauseService.js");

exports.run = function (externalCustomerId) {
    var data = {
        urlPath       : UrlPath.PAUSE,
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