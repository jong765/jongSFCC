'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

/**
 * Get history of point earning events completed by a customer.
 */
exports.run = function (emailAddress, lpCustomerId, extCustomerId, pageNumber, entriesPerPage) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_EVENTS,
        requestMethod : 'GET',
        requestParam  : getRequestParam(emailAddress, lpCustomerId, extCustomerId, pageNumber, entriesPerPage)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(emailAddress, lpCustomerId, extCustomerId, pageNumber, entriesPerPage) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    if (emailAddress) requestParam.email = emailAddress;
    if (lpCustomerId) requestParam.customer_id = lpCustomerId;
    if (extCustomerId) requestParam.external_customer_id = extCustomerId;
    if (pageNumber) requestParam.page_number = pageNumber;
    if (entriesPerPage) requestParam.entries_per_page = entriesPerPage;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}