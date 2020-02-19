/**
 * CustomerCouponsService.js
 * 
 * Get coupons assigned to a customer.
 */
'use strict';

var Util = require('../util/Util');

exports.run = function(externalCustomerId, emailAddress) {
	var data = {
		urlPath : require('../util/LoyaltyPlusConstants').UrlPath.CUSTOMER_COUPONS,
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