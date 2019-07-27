'use strict';

const ServiceRegistry = require('dw/svc/ServiceRegistry');
const Status = require('dw/system/Status');
const Site = require('dw/system/Site');
const CustomerRequest = require('../request/CustomerRequest');
const HTTPRequestPart = require('dw/net/HTTPRequestPart');

exports.enroll = function (email, customerId, firstName, lastName, address1, city) {
    let data = {
        urlPath       : '/api/enroll.json',
        requestMethod : 'POST',
        request       : CustomerRequest.getEnrollRequest(email, customerId, firstName, lastName, address1, city)
    };

    let result = callService(data);
    return result;
};

exports.updateCustomerInfo = function () {
	let data = {
		urlPath       : '/data/customer/update_customer_info',
	    requestMethod : 'POST',
	    request       : CustomerRequest.getUpdateCustomerInfoRequest(customerId, email, firstName, lastName, addressLine1, addressLine2, city, state, postalCode)
	};
}

exports.updateEmail = function (customerId, fromEmail, toEmail) {
    let data = {
        urlPath       : '/data/customer/update_email',
        requestMethod : 'POST',
        request       : CustomerRequest.getUpdateEmailRequest(customerId, fromEmail, toEmail)
    };

    let result = callService(data);
    return result;
};

function callService(data) {
	let loyaltyPlusServiceInit = require('~/cartridge/scripts/LoyaltyPlus/init/LoyaltyPlusServiceInit');
    let response = loyaltyPlusServiceInit.LoyaltyPlusService('loyaltyplus.http.default').call(data);
    return response;
}