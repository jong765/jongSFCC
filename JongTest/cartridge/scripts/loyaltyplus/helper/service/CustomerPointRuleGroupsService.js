/**
 * CustomerPointRuleGroupsService.js
 * 
 * Lists the full detail of all point rules available to the customer, grouped
 * by the point rule group.
 */
'use strict';

var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error",
		"CustomerPointRuleGroupsService.js");

exports.run = function(externalCustomerId, emailAddress) {
	var data = {
		urlPath : require('../util/LoyaltyPlusConstants').UrlPath.CUSTOMER_POINT_RULE_GROUPS,
		requestMethod : 'GET',
		requestParam : getRequestParam(externalCustomerId, emailAddress)
	};

	var result = Util.callService(data);
	return result;
};

function getRequestParam(externalCustomerId, emailAddress) {
	var requestParam = {
		uuid : require('../util/LoyaltyPlusConstants').CustomPreference.ACCOUNT_ID
	};
	if (externalCustomerId)
		requestParam.external_customer_id = externalCustomerId;
	if (emailAddress)
		requestParam.email = emailAddress;
	requestParam.sig = Util.getSignature(requestParam);

	return requestParam;
}