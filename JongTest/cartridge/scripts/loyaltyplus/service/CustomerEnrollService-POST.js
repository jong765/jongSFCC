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
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "CustomerEnrollService.js");

exports.run = function (emailAddress, firstName, lastName, birthDate, shoppingPreference, preferredStore, address, mobilePhone) {
	var urlPath = UrlPath.CUSTOMER_ENROLL;
    var data = {
        urlPath       : urlPath,
        requestMethod : 'POST',
        requestParam  : getRequestParam(urlPath, emailAddress, firstName, lastName, birthDate, shoppingPreference, preferredStore, address, mobilePhone),
        requestBody   : {"first_name":firstName, "last_name":lastName}
    };
    var result = Util.callService(data);
    return result;
};

function getRequestParam(urlPath, emailAddress, firstName, lastName, birthDate, shoppingPreference, preferredStore, address, mobilePhone) {
	var requestParam = {uuid:CustomPreference.ACCOUNT_ID};
	if (emailAddress) requestParam.email = emailAddress;
	//if (firstName) requestParam.first_name = firstName;
	//if (lastName) requestParam.last_name = lastName;
	if (birthDate) requestParam.birthdate = birthDate;
	if (address.addressLine1) requestParam.address_line_1 = address.addressLine1;
	if (address.addressLine2) requestParam.address_line_2 = address.addressLine2;
	if (address.city) requestParam.city = address.city;
	if (address.postalCode) requestParam.postal_code = address.postalCode;
	if (address.state) requestParam.state = address.state;
	if (mobilePhone) requestParam.mobile_phone = mobilePhone;
	//if (shoppingPreference) {
	//	requestParam["custom_attributes[shopping_preference]"] = shoppingPreference;
	//}
	//if (preferredStore) {
	//	requestParam["custom_attributes[pref_store]"] = preferredStore;
	//}
	requestParam.channel = Constant.CHANNEL;
	var requestBody = {"first_name":firstName, "last_name":lastName};
	requestParam.sig = Util.getSignature(urlPath, requestParam, requestBody);

    return requestParam;
}