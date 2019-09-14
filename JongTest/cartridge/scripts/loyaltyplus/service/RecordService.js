/********************************************************************************************
 * 
 *  RecordService.js
 * 
 *  Description :   Record an event.
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
var Constant = require('../util/LoyaltyPlusConstants').Constant;

/**
 * Get customer information.
 */
exports.run = function (externalCustomerId, emailAddress, type, value, eventId) {
    var data = {
        urlPath       : UrlPath.RECORD,
        requestMethod : 'GET',
        requestParam  : getRequestParam(externalCustomerId, emailAddress, type, value, eventId)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(externalCustomerId, emailAddress, type, value, eventId) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    if (externalCustomerId) requestParam.external_customer_id = externalCustomerId;
    if (emailAddress) requestParam.email = emailAddress;
    if (type) requestParam.type = type;
    if (value) requestParam.value = value;
    if (eventId) requestParam.event_id = eventId;
    if (channel) requestParam.channel = Constant.CHANNEL;	
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}