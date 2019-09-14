/********************************************************************************************
 * 
 *  CustomerSearchService.js
 * 
 *  Description :   Search for customers using data such as email, name or phone number. 
 *  Author      :   Jong Kim
 *  Date        :   09/04/2019
 *  
 *  Modification log:
 *  
 *  	
 ********************************************************************************************/
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

exports.run = function (emailAddress, lastName, phone, address1, postalCode, entriesPerPage, page) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_SEARCH,
        requestMethod : 'GET',
        requestParam  : getRequestParam(emailAddress, lastName, phone, address1, postalCode, entriesPerPage, page)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam (emailAddress, lastName, phone, address1, postalCode, entriesPerPage, page) {
	var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    if (emailAddress) requestParam.email = emailAddress;
    if (lastName) requestParam.last_name = lastName;
    if (phone) requestParam.phone = phone;
    if (address1) requestParam.adddress_line_1 = address1;
    if (postalCode) requestParam.postal_code = postalCode;
    if (entriesPerPage) requestParam.entries_per_page = entriesPerPage;
    if (page) requestParam.page = page;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}