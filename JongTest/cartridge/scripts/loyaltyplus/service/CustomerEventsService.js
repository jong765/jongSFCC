/********************************************************************************************
 * 
 *  CustomerEventsService.js
 * 
 *  Description :   Get history of point earning events completed by a customer.
 *  Author      :   Jong Kim
 *  Date        :   09/12/2019
 *  
 *  Modification log:
 *  
 *  	
 ********************************************************************************************/
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

exports.run = function (externalCustomerId, pageNumber, entriesPerPage) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_EVENTS,
        requestMethod : 'GET',
        requestParam  : getRequestParam(externalCustomerId, pageNumber, entriesPerPage)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(externalCustomerId, pageNumber, entriesPerPage) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    if (externalCustomerId) requestParam.external_customer_id = externalCustomerId;
    if (pageNumber) requestParam.page_number = pageNumber;
    if (entriesPerPage) requestParam.entries_per_page = entriesPerPage;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}