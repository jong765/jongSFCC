/**
 *  CustomerEnrollService.js
 * 
 *  Enroll a customer in the program.	
 */
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var Constant = require('../util/LoyaltyPlusConstants').Constant;
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "CustomerEnrollService-POST.js");

exports.run = function (emailAddress, firstName, lastName, birthDate, shoppingPreference, preferredStore, address, mobilePhone) {
	var urlPath = UrlPath.CUSTOMER_ENROLL;
	var requestBody = {};
	requestBody.first_name = firstName;
	requestBody.last_name = lastName;
	requestBody.birthdate = birthDate;
	requestBody.custom_attributes = '["shopping_preference":shoppingPreference]';
    var data = {
        "urlPath"       : urlPath,
        "requestMethod" : 'POST',
        "requestParam"  : getRequestParam(emailAddress, firstName, lastName, birthDate, shoppingPreference, preferredStore, address, mobilePhone),
        "requestBody"   : requestBody
    };
    var result = Util.callService(data);
    return result;
};

function getRequestParam(emailAddress, firstName, lastName, birthDate, shoppingPreference, preferredStore, address, mobilePhone) {
	var requestParam = {uuid:CustomPreference.ACCOUNT_ID};
	var signatureParam = null;
	if (emailAddress) requestParam.email = emailAddress;
	requestParam.channel = Constant.CHANNEL;
	signatureParam = Util.copyObject(requestParam);
	if (firstName) signatureParam.first_name = firstName;
	if (lastName) signatureParam.last_name = lastName;
	if (birthDate) signatureParam.birthdate = birthDate;
	if (address.addressLine1) requestParam.address_line_1 = address.addressLine1;
	if (address.addressLine2) requestParam.address_line_2 = address.addressLine2;
	if (address.city) requestParam.city = address.city;
	if (address.postalCode) requestParam.postal_code = address.postalCode;
	if (address.state) requestParam.state = address.state;
	if (mobilePhone) requestParam.mobile_phone = mobilePhone;
	if (shoppingPreference) {
		signatureParam["custom_attributes[shopping_preference]"] = shoppingPreference;
	}
	//if (preferredStore) {
	//	requestParam["custom_attributes[pref_store]"] = preferredStore;
	//}
	
	requestParam.sig = Util.getSignature(signatureParam);

    return requestParam;
}