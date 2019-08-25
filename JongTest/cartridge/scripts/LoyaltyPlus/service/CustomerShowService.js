'use strict';

var CustomerShowResponse = require('../serviceResponse/CustomerShowResponse');
var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

/**
 * Get customer information.
 */
exports.run = function (emailAddress, extCustomerId, vendor, vendorId, include) {
    var data = {
        urlPath       : UrlPath.CUSTOMER_SHOW,
        requestMethod : 'GET',
        request       : getCustomerShowRequest(emailAddress, extCustomerId, vendor, vendorId, include)
    };

    var result = Util.callService(data);
    var response = new CustomerShowResponse(result);
    return response;
};

function getCustomerShowRequest(emailAddress, extCustomerId, vendor, vendorId, include) {
    var request = {uuid : CustomPreference.ACCOUNT_ID};
    if (emailAddress) request.email = emailAddress;
    if (extCustomerId) request.external_customer_id = extCustomerId;
    if (vendor) request.vendor = vendor;
    if (vendorId) request.vedor_id = vendorId;
    if (include) request.include = include;
    request.sig = Util.getSignature(request);
    
    return request;
}