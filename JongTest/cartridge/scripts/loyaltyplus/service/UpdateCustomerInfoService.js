/**
 *  UpdateCustomerInfoService.js
 * 
 *  Change external customer id or personal information of a member.
 */
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "UpdateCustomerInfoService.js");

exports.run = function (externalCustomerId, emailAddress, firstName, lastName, birthDate, shoppingPreference, address, mobilePhone) {
    var data = {
        urlPath       : UrlPath.UPDATE_CUSTOMER_INFO,
        requestMethod : 'GET',
        requestParam  : getRequestParam(externalCustomerId, emailAddress, firstName, lastName, birthDate, shoppingPreference, address, mobilePhone, lastVisitDate)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(externalCustomerId, emailAddress, firstName, lastName, birthDate, shoppingPreference, address, mobilePhone) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    requestParam.external_customer_id = externalCustomerId;
    if (emailAddress) requestParam.new_email = emailAddress;
	requestParam.first_name = ifnull(firstName);
    requestParam.last_name = ifnull(lastName);
    requestParam.birthdate = ifnull(birthDate);
	requestParam["custom_attributes[shopping_preference]"] = ifnull(shoppingPreference);
    requestParam.address_line_1 = ifnull(address.addressLine1);
    requestParam.address_line_2 = ifnull(address.addressLine2);
    requestParam.city = ifnull(address.city);
    requestParam.postal_code = ifnull(address.postalCode);
    requestParam.state = ifnull(address.state);
	requestParam.mobile_phone = ifnull(mobilePhone);
    requestParam.sig = Util.getSignature(requestParam);
    
	logger.debug("requestParam: " + JSON.stringify(requestParam));
    return requestParam;
}

function ifnull(value) {
	return value==null? "":value;
}