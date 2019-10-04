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
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "LoyaltyPlusServiceInit.js");

exports.run = function (emailAddress, firstName, lastName, birthDate, shoppingPreference, 
        preferredStore, address, mobilePhone, marketingId) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_ENROLL,
        requestMethod : 'GET',
        requestParam  : getRequestParam(emailAddress, firstName, lastName, birthDate, shoppingPreference, 
                preferredStore, address, mobilePhone, marketingId)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(emailAddress, firstName, lastName, birthDate, shoppingPreference, 
        preferredStore, address, mobilePhone, marketingId) {
	var requestParam = {uuid:CustomPreference.ACCOUNT_ID};
	if (emailAddress) requestParam.email = emailAddress;
	if (firstName) requestParam.first_name = firstName;
	if (lastName) requestParam.last_name = lastName;
	if (birthDate) requestParam.birthdate = birthDate;
	if (shoppingPreference) requestParam["custom_attributes[shopping_preference]"] = shoppingPreference;
	if (address.addressLine1) requestParam.address_line_1 = address.addressLine1;
	if (address.addressLine2) requestParam.address_line_2 = address.addressLine2;
	if (address.city) requestParam.city = address.city;
	if (address.postalCode) requestParam.postal_code = address.postalCode;
	if (address.state) requestParam.state = address.state;
	if (mobilePhone) requestParam.mobile_phone = mobilePhone;
	if (marketingId) requestParam.sub_channel = Util.getSubChannel(marketingId);
	requestParam.channel = Constant.CHANNEL;
	requestParam.last_visit_date = Util.getCurrentDate("yyyy-MM-dd'T'HH:MM:ss-HH:MM");
	requestParam.sig = Util.getSignature(requestParam);

	logger.debug("requestParam: " + JSON.stringify(requestParam));
    return requestParam;
}