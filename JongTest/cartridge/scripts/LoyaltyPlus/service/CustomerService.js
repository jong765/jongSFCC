'use strict';

var Status = require('dw/system/Status');
var Site = require('dw/system/Site');
var CustomerRequest = require('../serviceRequest/CustomerRequest');
var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;

exports.customerSearch = function (emailAddress, lastName, phone, address1, postalCode, page) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_SEARCH,
        requestMethod : 'GET',
        request       : CustomerRequest.getCustomerSearchRequest(emailAddress, lastName, phone, address1, postalCode, page)
    };

    var result = Util.callService(data);
    return result;
};

exports.customerRewards = function (accountId, customerId, loyaltyPlusCustomerId, email) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_REWARDS,
        requestMethod : 'GET',
        request       : CustomerRequest.getCustomerRewardsRequest(accountId, customerId, loyaltyPlusCustomerId, email)
    };

    var result = Util.callService(data);
    return result;
};

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
    var data = {
        urlPath       : UrlPath.UPDATE_EMAIL,
        requestMethod : 'POST',
        request       : CustomerRequest.getUpdateEmailRequest(customerId, fromEmail, toEmail)
    };

    var result = Util.callService(data);
    return result;
};

exports.updateAttributes = function (customerId, email, operation, path, value) {
    var data = {
        urlPath       : UrlPath.UPDATE_ATTRIBUTES,
        requestMethod : 'POST',
        request       : CustomerRequest.getUpdateAttributesRequest(customerId, email, operation, path, value)
    };

    var result = Util.callService(data);
    return result;
};