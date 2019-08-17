'use strict';

const Util = require('../util/Util');

exports.getUpdateCustomerInfoRequest = function (customerId, email, firstName, lastName, addressLine1, addressLine2, city, state, postalCode) {
	let updateCustomerInfoRequest = {
		external_customer_id	:	customerId,
		email					:	email,
		first_name				: 	firstName,
		last_name				:	lastName,
		address_line_1			:	addressLine1,
		address_line_2			:	addressLine2,
		city					:	city,
		state					:	state,
		postal_code				:	postalCode
	};
	
	updateCustomerInfoRequest.sig = Util.getSignature(updateCustomerInfoRequest);
	
	return updateCustomerInfoRequest;
}

exports.getUpdateEmailRequest = function (customerId, fromEmail, toEmail) {
    let updateEmailRequest = {
    	external_customer_id	:	customerId,
    	from_email				:	fromEmail,
    	to_email				: 	toEmail
    };
    
    updateEmailRequest.sig = Util.getSignature(updateEmailRequest);
    
    return updateEmailRequest;
}

exports.getUpdateAttributesRequest = function (customerId, email, operation, path, value) {
    let updateAttributesRequest = {
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
    let customerRewardsRequest = {
    	uuid 					: 	accountId,
    	external_customer_id	:	customerId,
    	customer_id				:	loyaltyPlusCustomerId,
    	email					:	email
    };
    
    customerRewardsRequest.sig = Util.getSignature(customerRewardsRequest);
    
    return customerRewardsRequest;
}


exports.getCustomerShowRequest = function (customerId, loyaltyPlusCustomerId, email) {
    let customerShowRequest = {
    	external_customer_id	:	customerId,
    	customer_id				:	loyaltyPlusCustomerId,
    	email					:	email
    };
    
    customerShowRequest.sig = Util.getSignature(customerShowRequest);
    
    return customerShowRequest;
}
