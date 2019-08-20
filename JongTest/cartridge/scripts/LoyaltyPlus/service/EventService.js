'use strict';

var Status = require('dw/system/Status');
var Site = require('dw/system/Site');
var EventRequest = require('../serviceRequest/EventRequest');
var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;

/**
 * Change event status to approved.
 *
 * @param {String} emailAddress
 * @param {String} extCustomerId
 * @param {String} eventId
 */
exports.approve = function (emailAddress, extCustomerId, eventId) {
    var data = {
        urlPath       : UrlPath.APPROVE,
        requestMethod : 'POST',
        request       : ApiRequest.getApproveEventRequest(emailAddress, extCustomerId, eventId)
    };

    var result = Util.callService(data);
    return result;
};

/**
 * Record an event.
 *
 * @param {String} emailAddress
 * @param {String} extCustomerId
 * @param {String} type
 */
exports.record = function (emailAddress, extCustomerId, type) {
    var data = {
        urlPath       : UrlPath.RECORD,
        requestMethod : 'POST',
        request       : ApiRequest.getRecordEventRequest(emailAddress, extCustomerId, type)
    };

    var result = Util.callService(data);
    return result;
};

/**
 * Change event status to rejected.
 *
 * @param {String} emailAddress
 * @param {String} extCustomerId
 * @param {String} eventId
 */
exports.reject = function (emailAddress, extCustomerId, eventId) {
    var data = {
        urlPath       : UrlPath.REJECT,
        requestMethod : 'POST',
        request       : ApiRequest.getRejectEventRequest(emailAddress, extCustomerId, eventId)
    };

    var result = Util.callService(data);
    return result;
};