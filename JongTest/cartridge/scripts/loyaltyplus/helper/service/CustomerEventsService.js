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

exports.run = function (externalCustomerId, eventType, afterDate, beforeDate, dateFilter, pageNumber, entriesPerPage) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_EVENTS,
        requestMethod : 'GET',
        requestParam  : getRequestParam(externalCustomerId, eventType, afterDate, beforeDate, dateFilter, pageNumber, entriesPerPage)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(externalCustomerId, eventType, afterDate, beforeDate, dateFilter, pageNumber, entriesPerPage) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    requestParam.external_customer_id = externalCustomerId;
    if (eventType) requestParam.type = eventType;
    if (afterDate) requestParam.after_date = afterDate;
    if (beforeDate) requestParam.before_date = beforeDate;
    if (dateFilter) requestParam.date_filter = dateFilter;
    if (pageNumber) requestParam.page_number = pageNumber;
    if (entriesPerPage) requestParam.entries_per_page = entriesPerPage;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}