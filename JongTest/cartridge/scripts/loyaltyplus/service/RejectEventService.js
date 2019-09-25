/**
 *  RejectEventService.js
 * 
 *  Change event status to rejected.
 */
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var Constant = require('../util/LoyaltyPlusConstants').Constant;

exports.run = function (externalCustomerId, eventType, eventId) {
    var data = {
        urlPath       : UrlPath.REJECT,
        requestMethod : 'GET',
        requestParam  : getRequestParam(externalCustomerId, eventType, eventId)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(externalCustomerId, eventType, eventId) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    if (externalCustomerId) requestParam.external_customer_id = externalCustomerId;
    if (eventType) requestParam.event_type = eventType;
    if (eventId) requestParam.event_Id = eventId;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}