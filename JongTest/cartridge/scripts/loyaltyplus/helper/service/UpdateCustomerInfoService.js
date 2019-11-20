/**
 *  UpdateCustomerInfoService.js
 * 
 *  Update the customer details of a customer
 */
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "UpdateCustomerInfoService.js");

exports.run = function (customerInfo) {
    var data = {
        urlPath       : UrlPath.UPDATE_CUSTOMER_INFO,
        requestMethod : 'GET',
        requestParam  : getRequestParam(customerInfo)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(customerInfo) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    requestParam.external_customer_id = customerInfo.externalCustomerId;
    if (customerInfo.newEmailAddress != "undefined") requestParam.new_email = customerInfo.newEmailAddress;
    if (customerInfo.firstName != "undefined") requestParam.first_name = ifnull(customerInfo.firstName);
    if (customerInfo.lastName != "undefined") requestParam.last_name = ifnull(customerInfo.lastName);
    if (customerInfo.birthDate != "undefined") requestParam.birthdate = ifnull(customerInfo.birthDate);
    if (customerInfo.mobilePhone != "undefined") requestParam.mobile_phone = ifnull(customerInfo.mobilePhone);
    if (customerInfo.address != "undefined") {
    	var address = customerInfo.address;
    	if (address.addressLine1 != "undefined") requestParam.address_line_1 = ifnull(address.addressLine1);
    	if (address.addressLine2 != "undefined") requestParam.address_line_2 = ifnull(address.addressLine2);
    	if (address.city != "undefined") requestParam.city = ifnull(address.city);
    	if (address.postalCode != "undefined") requestParam.postal_code = ifnull(address.postalCode);
    	if (address.state != "undefined") requestParam.state = ifnull(address.state);
    }
    
    if (customerInfo.memberAttributes.length > 0) {
    	var signatureParam = Util.copyObject(requestParam);
	    var customAttributeSignatureParamString = "custom_attributes";
		if (customerInfo.acceptedTermsConditions != "undefined") {
			requestParam["custom_attributes[accepted_terms_and_conditions]"] = customerInfo.acceptedTermsConditions;
			customAttributeSignatureParamString += "accepted_terms_and_conditions" + customerInfo.acceptedTermsConditions;
		}
		if (customerInfo.shoppingPreference != "undefined") {
			requestParam["custom_attributes[shopping_preference]"] = customerInfo.shoppingPreference;
			customAttributeSignatureParamString += "shopping_preference" + ifnull(customerInfo.shoppingPreference);
		}
		signatureParam[customAttributeSignatureParamString] = "";
		requestParam.sig = Util.getSignature(signatureParam);
	} else {
		requestParam.sig = Util.getSignature(requestParam);
	}
    
	logger.debug("customerInfo: " + JSON.stringify(customerInfo));
    return requestParam;
}

function ifnull(value) {
	return value==null? "":value;
}