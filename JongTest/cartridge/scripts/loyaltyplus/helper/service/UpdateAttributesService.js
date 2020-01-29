/**
 * UpdateAttributesService.js
 * 
 * Update the custom attributes of a member.
 */
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error",
		"UpdateAttributesService.js");

exports.run = function(externalCustomerId, emailAddress, operation, path, value) {
	var data = {
		urlPath : UrlPath.UPDATE_ATTRIBUTES,
		requestMethod : 'GET',
		requestParam : getRequestParam(externalCustomerId, emailAddress, operation, path, value)
	};

	var result = Util.callService(data);
	return result;
};

function getRequestParam(externalCustomerId, emailAddress, operation, path, value) {
	var requestParam = {
		uuid : CustomPreference.ACCOUNT_ID
	};
	if (externalCustomerId)
		requestParam.external_customer_id = externalCustomerId;
	if (emailAddress)
		requestParam.email = emailAddress;
	requestParam.op = operation;
	requestParam.path = path;
	requestParam.value = value;
	requestParam.sig = Util.getSignature(requestParam);

	return requestParam;
}