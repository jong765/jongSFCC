/**
 *  CustomerEventsService.js
 * 
 *  Get history of point earning events completed by a customer.	
 */
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "CustomerEventsService.js");

exports.run = function (externalCustomerId, eventType, dateFilter, afterDate, pageNumber, entriesPerPage) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_EVENTS,
        requestMethod : 'GET',
        requestParam  : getRequestParam(externalCustomerId, eventType, dateFilter, afterDate, pageNumber, entriesPerPage)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(externalCustomerId, eventType, dateFilter, afterDate, pageNumber, entriesPerPage) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    if (externalCustomerId) requestParam.external_customer_id = externalCustomerId;
    if (eventType) requestParam.type = eventType;
    if (dateFilter) requestParam.date_filter = dateFilter;
    if (afterDate) requestParam.after_date = afterDate;
    if (pageNumber) requestParam.page_number = pageNumber;
    if (entriesPerPage) requestParam.entries_per_page = entriesPerPage;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}