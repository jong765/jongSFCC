'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

/**
 * Get history of point earning events completed by a customer.
 */
exports.run = function (emailAddress, lastName, phone, address1, postalCode, page) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_SEARCH,
        requestMethod : 'GET',
        requestParam  : getCustomerSearchRequestParam(emailAddress, lastName, phone, address1, postalCode, page)
    };

    var result = Util.callService(data);
    return result;
};

function getCustomerSearchRequestParam (emailAddress, lastName, phone, address1, postalCode, page) {
	var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    if (emailAddress) requestParam.email = emailAddress;
    if (lastName) requestParam.last_name = lastName;
    if (phone) requestParam.phone = phone;
    if (address1) requestParam.adddress_line_1 = address1;
    if (postalCode) requestParam.postal_code = postalCode;
    if (page) requestParam.page = page;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}