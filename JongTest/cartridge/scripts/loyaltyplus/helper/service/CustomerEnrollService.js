/**
 *  CustomerEnrollService.js
 * 
 *  Enroll a customer in the program.	
 */
'use strict';

var Util = require('../util/Util');
var DateUtil = require('../util/DateUtil');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var Constant = require('../util/LoyaltyPlusConstants').Constant;
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "CustomerEnrollService.js");

exports.run = function (customerInfo, marketingId) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_ENROLL,
        requestMethod : 'GET',
        requestParam  : getRequestParam(customerInfo, marketingId)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(customerInfo, marketingId) {
	logger.debug("customerInfo: " + JSON.stringify(customerInfo));
	var requestParam = {uuid:CustomPreference.ACCOUNT_ID};
	var signatureParam = null;
	if (customerInfo.emailAddress != "undefined") 
		requestParam.email = customerInfo.emailAddress;
	if (customerInfo.firstName != "undefined") 
		requestParam.first_name = customerInfo.firstName;
	if (customerInfo.lastName != "undefined") 
		requestParam.last_name = customerInfo.lastName;
	if (customerInfo.birthDate != "undefined") 
		requestParam.birthdate = customerInfo.birthDate;
	if (customerInfo.address != "undefined") {
		if (customerInfo.address.addressLine1 != "undefined") 
			requestParam.address_line_1 = customerInfo.address.addressLine1;
		if (customerInfo.address.addressLine2 != "undefined") 
			requestParam.address_line_2 = customerInfo.address.addressLine2;
		if (customerInfo.address.city != "undefined") 
			requestParam.city = customerInfo.address.city;
		if (customerInfo.address.postalCode != "undefined") 
			requestParam.postal_code = customerInfo.address.postalCode;
		if (customerInfo.address.state != "undefined") 
			requestParam.state = customerInfo.address.state;
	}
	if (customerInfo.mobilePhone != "undefined") 
		requestParam.mobile_phone = customerInfo.mobilePhone;
	if (customerInfo.marketingId != "undefined") 
		requestParam.sub_channel = Util.getSubChannel(marketingId);
	requestParam.channel = Constant.CHANNEL;
	requestParam.last_visit_date = DateUtil.getCurrentDateString("yyyy-MM-dd'T'HH:MM:ss-HH:MM");
	
	if (customerInfo.memberAttributes.length > 0) {
		var signatureParam = Util.copyObject(requestParam);
		var customAttributeSignatureParamString = "custom_attributes";
		if (customerInfo.acceptedTermsConditions != "undefined") {
			requestParam["custom_attributes[accepted_terms_and_conditions]"] = customerInfo.acceptedTermsConditions;
			customAttributeSignatureParamString += "accepted_terms_and_conditions" + customerInfo.acceptedTermsConditions;
		}
		if (customerInfo.shoppingPreference != "undefined") {
			requestParam["custom_attributes[shopping_preference]"] = customerInfo.shoppingPreference;
			customAttributeSignatureParamString += "shopping_preference" + customerInfo.shoppingPreference;
		}
		signatureParam[customAttributeSignatureParamString] = "";
	    requestParam.sig = Util.getSignature(signatureParam);
	} else {
		requestParam.sig = Util.getSignature(requestParam);
	}

	logger.debug("requestParam: " + JSON.stringify(requestParam));
    return requestParam;
}