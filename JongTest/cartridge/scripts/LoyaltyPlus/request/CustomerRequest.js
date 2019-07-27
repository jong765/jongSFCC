'use strict';

exports.getEnrollRequest = function (email, customerId, firstName, lastName, address1, city) {
    let enrollRequest = {
    	email					:	email,
    	external_customer_id	:	customerId,
    	first_name				:	firstName,
    	last_name				:	lastName,
    	address_line_1			:	address1,
    	city					:	city
    };
    
    return enrollRequest;
}

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
	
	return updateCustomerInfoRequest;
}

exports.getUpdateEmailRequest = function (customerId, fromEmail, toEmail) {
    let updateEmailRequest = {
    	external_customer_id	:	customerId,
    	from_email				:	fromEmail,
    	to_email				: 	toEmail
    };

    return updateEmailRequest;
}
