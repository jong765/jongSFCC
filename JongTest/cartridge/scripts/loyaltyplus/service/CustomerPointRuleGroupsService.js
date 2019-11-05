/**
 *  CustomerPointRuleGroupsService.js
 * 
 *  Lists the full detail of all point rules available to the customer, grouped by the point rule group.	
 */
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "CustomerPointRuleGroupsService.js");

exports.run = function (externalCustomerId) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_POINT_RULE_GROUPS,
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