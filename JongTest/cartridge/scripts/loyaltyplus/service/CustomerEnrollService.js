/********************************************************************************************
 * 
 *  CustomerEnrollService.js
 * 
 *  Description :   Enroll a customer in the program.
 *  Author      :   Jong Kim
 *  Date        :   09/12/2019
 *  
 *  Modification log:
 *  
 *  	
 ********************************************************************************************/
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var Constant = require('../util/LoyaltyPlusConstants').Constant;

exports.run = function (emailAddress, firstName, lastName, shoppingPreference, addressLine1, city, postalCode, birthDate, mobilePhone, state) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_ENROLL,
        requestMethod : 'GET',
        requestParam  : getRequestParam(emailAddress, firstName, lastName, shoppingPreference, addressLine1, city, postalCode, birthDate, mobilePhone, state)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(emailAddress, firstName, lastName, shoppingPreference, addressLine1, city, postalCode, birthDate, mobilePhone, state) {
	var requestParam = {uuid:CustomPreference.ACCOUNT_ID};
	if (emailAddress) requestParam.email = emailAddress;
	if (firstName) requestParam.first_name = firstName;
	if (lastName) requestParam.last_name = lastName;
	if (shoppingPreference) requestParam["custom_attributes[shopping_preference]"] = shoppingPreference;
	if (addressLine1) requestParam.address_line_1 = addressLine1;
	if (city) requestParam.city = city;
	if (postalCode) requestParam.postal_code = postalCode;
	if (birthDate) requestParam.birthdate = birthDate;
	if (mobilePhone) requestParam.mobile_phone = mobilePhone;
	if (state) requestParam.state = state;
	requestParam.channel = Constant.CHANNEL;
	requestParam.sig = Util.getSignature(requestParam);
    return requestParam;
}