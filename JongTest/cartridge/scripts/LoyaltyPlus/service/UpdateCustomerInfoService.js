'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

/**
 * Get customer information.
 */
exports.run = function (emailAddress, extCustomerId, firstName, lastName, address1, address2, city, state, postalCode, birthDate, homePhone, workPhone, mobilePhone) {
    var data = {
        urlPath       : UrlPath.UPDATE_CUSTOMER_INFO,
        requestMethod : 'POST',
        requestParam  : getRequestParam(emailAddress, extCustomerId, firstName, lastName, address1, address2, city, state, postalCode, birthDate, homePhone, workPhone, mobilePhone)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(emailAddress, extCustomerId, firstName, lastName, address1, address2, city, state, postalCode, birthDate, homePhone, workPhone, mobilePhone) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    if (emailAddress) requestParam.email = emailAddress;
    if (extCustomerId) requestParam.external_customer_id = extCustomerId;
    if (firstName) requestParam.first_name = firstName;
    if (lastName) requestParam.last_name = lastName;
    if (address1) requestParam.address_line_1 = address1;
    if (address2) requestParam.address_line_2 = address2;
    if (city) requestParam.city = city;
    if (state) reqestParam.state = state;
    if (postalCode) requestParam.postal_code = postalCode;
    if (birthDate) requestParam.birthdate = birthDate;
    if (homePhone) requestParam.home_phone = homePhone;
    if (workPhone) requestParam.work_phone = workPhone;
    if (mobilePhone) requestParam.mobile_phone = mobilePhone;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}