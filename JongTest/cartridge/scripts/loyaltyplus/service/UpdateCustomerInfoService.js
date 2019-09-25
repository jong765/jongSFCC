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

exports.run = function (externalCustomerId, firstName, lastName, birthDate, shoppingPreference, address, mobilePhone) {
    var data = {
        urlPath       : UrlPath.UPDATE_CUSTOMER_INFO,
        requestMethod : 'GET',
        requestParam  : getRequestParam(externalCustomerId, firstName, lastName, birthDate, shoppingPreference, address, mobilePhone)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(externalCustomerId, firstName, lastName, birthDate, shoppingPreference, address, mobilePhone) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    if (externalCustomerId) requestParam.external_customer_id = externalCustomerId;
	if (firstName) requestParam.first_name = firstName;
    if (lastName) requestParam.last_name = lastName;
    if (birthDate) requestParam.birthdate = birthDate;
	if (shoppingPreference) requestParam["custom_attributes[shopping_preference]"] = shoppingPreference;
    if (address.addressLine1) requestParam.address_line_1 = address.addressLine1;
    if (address.addressLine2) requestParam.address_line_2 = address.addressLine2;
    if (address.city) requestParam.city = address.city;
    if (address.postalCode) requestParam.postal_code = address.postalCode;
    if (address.state) requestParam.state = address.state;
	if (mobilePhone) requestParam.mobile_phone = mobilePhone;
    requestParam.sig = Util.getSignature(requestParam);
    
	logger.debug("requestParam: " + JSON.stringify(requestParam));
    return requestParam;
}