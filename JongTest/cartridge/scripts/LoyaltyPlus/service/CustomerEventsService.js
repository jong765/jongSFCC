'use strict';

var CustomerEventsResponse = require('../serviceResponse/CustomerEventsResponse');
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
        request       : getCustomerEventsRequest(emailAddress, lpCustomerId, extCustomerId, pageNumber, entriesPerPage)
    };

    var result = Util.callService(data);
    var response = new CustomerEventsResponse(result);
    return response;
};

function getCustomerEventsRequest(emailAddress, lpCustomerId, extCustomerId, pageNumber, entriesPerPage) {
    var request = {uuid : CustomPreference.ACCOUNT_ID};
    if (emailAddress) request.email = emailAddress;
    if (lpCustomerId) request.customer_id = lpCustomerId;
    if (extCustomerId) request.external_customer_id = extCustomerId;
    if (pageNumber) request.page_number = pageNumber;
    if (entriesPerPage) request.entries_per_page = entriesPerPage;
    request.sig = Util.getSignature(request);
    
    return request;
}