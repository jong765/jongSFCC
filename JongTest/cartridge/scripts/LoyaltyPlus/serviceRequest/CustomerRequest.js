'use strict';

var Util = require('../util/Util');

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


exports.getCustomerShowRequest = function (emailAddress, lpCustomerId, extCustomerId) {
    var customerShowRequest = {
    	external_customer_id	:	extCustomerId,
    	customer_id				:	lpCustomerId,
    	email					:	emailAddress
    };
    
    customerShowRequest.sig = Util.getSignature(customerShowRequest);
    
    return customerShowRequest;
}
