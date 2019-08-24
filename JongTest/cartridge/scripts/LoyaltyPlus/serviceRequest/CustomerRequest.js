'use strict';

var Util = require('../util/Util');
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

exports.getCustomerRewardsRequest = function (accountId, customerId, loyaltyPlusCustomerId, email) {
    var customerRewardsRequest = {
    	uuid 					: 	accountId,
    	external_customer_id	:	customerId,
    	customer_id				:	loyaltyPlusCustomerId,
    	email					:	email
    };
    
    customerRewardsRequest.sig = Util.getSignature(customerRewardsRequest);
    
    return customerRewardsRequest;
}

exports.getCustomerSearchRequest = function (emailAddress, lastName, phone, address1, postalCode, page) {
    var customerSearchRequest = {
    	email					:	emailAddress,
    	last_name				:	lastName,
    	phone					:	phone,
    	address_line_1			:	address1,
    	postal_code				:	postalCode,
    	page					:	page
    };
    
    customerSearchRequest.sig = Util.getSignature(customerSearchRequest);
    
    return customerSearchRequest;
}


exports.getCustomerShowRequest = function (emailAddress, extCustomerId, vendor, vendorId, include) {
    var request = {uuid : CustomPreference.ACCOUNT_ID};
    if (emailAddress) request.email = emailAddress;
    if (extCustomerId) request.external_customer_id = extCustomerId;
    if (vendor) request.vendor = vendor;
    if (vendorId) request.vedor_id = vendorId;
    if (include) request.include = include;
    request.sig = Util.getSignature(request);
    
    return request;
}

exports.getUpdateCustomerInfoRequest = function (emailAddress, extCustomerId, firstName, lastName, birthDate, address) {
	var updateCustomerInfoRequest = {
		external_customer_id	:	extCustomerId,
		email					:	emailAddress,
		first_name				: 	firstName,
		last_name				:	lastName,
		address_line_1			:	address.address1,
		address_line_2			:	address.address2,
		city					:	address.city,
		state					:	address.state,
		postal_code				:	address.postalCode
	};
	
	updateCustomerInfoRequest.sig = Util.getSignature(updateCustomerInfoRequest);
	
	return updateCustomerInfoRequest;
}

exports.getUpdateEmailRequest = function (customerId, fromEmail, toEmail) {
    var updateEmailRequest = {
    	external_customer_id	:	customerId,
    	from_email				:	fromEmail,
    	to_email				: 	toEmail
    };
    
    updateEmailRequest.sig = Util.getSignature(updateEmailRequest);
    
    return updateEmailRequest;
}

exports.getUpdateAttributesRequest = function (customerId, email, operation, path, value) {
    var updateAttributesRequest = {
    	external_customer_id	:	customerId,
    	email					:	email,
    	op						: 	operation,
    	path					:	path,
    	value					:	value
    };
    
    updateAttributesRequest.sig = Util.getSignature(updateAttributesRequest);
    
    return updateAttributesRequest;
}
