'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

/**
 * Enroll a customer in the program.
 */
exports.run = function (emailAddress, firstName, lastName, postalCode, birthDate, homePhone, workPhone, mobilePhone) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_ENROLL,
        requestMethod : 'GET',
        requestParam  : getRequestParam(emailAddress, firstName, lastName, postalCode, birthDate, homePhone, workPhone, mobilePhone)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(emailAddress, firstName, lastName, postalCode, birthDate, homePhone, workPhone, mobilePhone) {
	var requestParam = {uuid:CustomPreference.ACCOUNT_ID};
	if (emailAddress) requestParam.email = emailAddress;
	if (firstName) requestParam.first_name = firstName;
	if (lastName) requestParam.last_name = lastName;
	if (postalCode) requestParam.postal_code = postalCode;
	if (birthDate) requestParam.birthdate = birthDate;
	if (homePhone) requestParam.home_phone = homePhone;
	if (workPhone) requestParam.work_phone = workPhone;
	if (mobilePhone) requestParam.mobile_phone = mobilePhone;
	requestParam.sig = Util.getSignature(requestParam);
    return requestParam;
}