'use strict';

var ServiceRegistry = require('dw/svc/ServiceRegistry');
var Status = require('dw/system/Status');
var Site = require('dw/system/Site');
var CustomerRequest = require('../serviceRequest/CustomerRequest');
var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;

exports.updateCustomerInfo = function () {
	var data = {
		urlPath       : UrlPath.UPDATE_CUSTOMER_INFO,
	    requestMethod : 'POST',
	    request       : CustomerRequest.getUpdateCustomerInfoRequest(customerId, email, firstName, lastName, addressLine1, addressLine2, city, state, postalCode)
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

exports.customerShow = function (customerId, loyaltyPlusCustomerId, email) {
    let data = {
        urlPath       : UrlPath.CUSTOMER_SHOW,
        requestMethod : 'GET',
        request       : CustomerRequest.getCustomerShowRequest(customerId, loyaltyPlusCustomerId, email)
    };

    let result = Util.callService(data);
    return result;
};