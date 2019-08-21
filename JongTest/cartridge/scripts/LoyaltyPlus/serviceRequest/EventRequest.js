'use strict';

var Util = require('../util/Util');
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

exports.getApproveEventRequest = function (emailAddress, extCustomerId, eventId) {
    var approveEventRequest = {
    	uuid					:	CustomPreference.ACCOUNT_ID,
    	email					:	emailAddress,
    	external_customer_id	:	extCustomerId,
    	id						:	eventId
    };
    
    approveEventRequest.sig = Util.getSignature(approveEventRequest);
    
    return approveEventRequest;
}

exports.getRecordEventRequest = function (emailAddress, extCustomerId, type) {
    var recordEventRequest = {
    	uuid					:	CustomPreference.ACCOUNT_ID,
    	email					:	emailAddress,
    	external_customer_id	:	extCustomerId,
    	type					:	type
    };
    
    recordEventRequest.sig = Util.getSignature(recordEventRequest);
    
    return recordEventRequest;
}

exports.getRejectEventRequest = function (emailAddress, extCustomerId, eventId) {
    var rejectEventRequest = {
    	uuid					:	CustomPreference.ACCOUNT_ID,
    	email					:	emailAddress,
    	external_customer_id	:	extCustomerId,
    	id						:	eventId
    };
    
    rejectEventRequest.sig = Util.getSignature(rejectEventRequest);
    
    return rejectEventRequest;
}
