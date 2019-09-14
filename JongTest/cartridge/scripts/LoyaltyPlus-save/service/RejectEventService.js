'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var Constant = require('../util/LoyaltyPlusConstants').Constant;

/**
 * Get customer information.
 */
exports.run = function (emailAddress, extCustomerId, eventType, value, eventId, detail, originalEventId, productArray) {
    var data = {
        urlPath       : UrlPath.RECORD,
        requestMethod : 'POST',
        requestParam  : getRequestParam(emailAddress, extCustomerId, eventType, value, eventId, detail, originalEventId, productArray)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(emailAddress, extCustomerId, eventType, value, eventId, detail, originalEventId, productArray) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    requestParam.channel = Constant.CHANNEL;
    if (emailAddress) requestParam.email = emailAddress;
    if (extCustomerId) requestParam.external_customer_id = extCustomerId;
    if (enentType) requestParam.type = eventType;
    if (value) requestParam.value = value;
    if (eventId) requestParam.event_id = eventId;
    if (detail) requestParam.detail = detail;
    if (originalEventId) requestParam.original_event_id = originalEventId;
    if (productArray) requestParam.productArray = productArray;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}