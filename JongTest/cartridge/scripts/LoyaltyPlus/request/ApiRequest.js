'use strict';

const Util = require('../util/Util');

exports.getEnrollRequest = function (email, customerId, firstName, lastName, address1, city) {
    let enrollRequest = {
    	email					:	email,
    	external_customer_id	:	customerId,
    	first_name				:	firstName,
    	last_name				:	lastName,
    	address_line_1			:	address1,
    	city					:	city
    };
    
    enrollRequest.sig = Util.getSignature(enrollRequest);
    
    return enrollRequest;
}
