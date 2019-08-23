'use strict';

var Status = require('dw/system/Status');
var Site = require('dw/system/Site');
var CustomerRequest = require('../serviceRequest/CustomerRequest');
var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;

exports.updateCustomerInfo = function (emailAddress, extCustomerId, firstName, lastName, birthDate, address) {
	var data = {
		urlPath       : UrlPath.UPDATE_CUSTOMER_INFO,
	    requestMethod : 'POST',
	    request       : CustomerRequest.getUpdateCustomerInfoRequest(emailAddress, extCustomerId, firstName, lastName, birthDate, address)
	};
	
    var result = Util.callService(data);
    return result;
}

exports.updateEmail = function (customerId, fromEmail, toEmail) {
    let data = {
        urlPath       : UrlPath.UPDATE_EMAIL,
        requestMethod : 'POST',
        request       : CustomerRequest.getUpdateEmailRequest(customerId, fromEmail, toEmail)
    };

    let result = Util.callService(data);
    return result;
};

exports.updateAttributes = function (customerId, email, operation, path, value) {
    let data = {
        urlPath       : UrlPath.UPDATE_ATTRIBUTES,
        requestMethod : 'POST',
        request       : CustomerRequest.getUpdateAttributesRequest(customerId, email, operation, path, value)
    };

    let result = Util.callService(data);
    return result;
};

exports.customerRewards = function (accountId, customerId, loyaltyPlusCustomerId, email) {
    let data = {
        urlPath       : UrlPath.CUSTOMER_REWARDS,
        requestMethod : 'GET',
        request       : CustomerRequest.getCustomerRewardsRequest(accountId, customerId, loyaltyPlusCustomerId, email)
    };

    let result = Util.callService(data);
    return result;
};

exports.customerSearch = function (emailAddress, lastName, phone, address1, postalCode, page) {
    let data = {
        urlPath       : UrlPath.CUSTOMER_SEARCH,
        requestMethod : 'GET',
        request       : CustomerRequest.getCustomerSearchRequest(emailAddress, lastName, phone, address1, postalCode, page)
    };

    let result = Util.callService(data);
    return result;
};

exports.customerShow = function (emailAddress, lpCustomerId, extCustomerId) {
    let data = {
        urlPath       : UrlPath.CUSTOMER_SHOW,
        requestMethod : 'GET',
        request       : CustomerRequest.getCustomerShowRequest(emailAddress, lpCustomerId, extCustomerId)
    };

    let result = Util.callService(data);
    return result;
};