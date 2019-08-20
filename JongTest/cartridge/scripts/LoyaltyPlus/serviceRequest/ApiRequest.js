'use strict';

var Util = require('../util/Util');
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var Constant = require('../util/LoyaltyPlusConstants').Constant;

exports.getCreateReferralRequest = function (emailAddress, lpCustomerId, extCustomerId) {
    var createReferralRequest = {
    	uuid					:	CustomPreference.ACCOUNT_ID,
    	email					:	emailAddress,
    	customer_id				:	lpCustomerId,
    	external_customer_id	:	extCustomerId
    };
    
    createReferralRequest.sig = Util.getSignature(createReferralRequest);
    
    return createReferralRequest;
}

exports.getPingRequest = function () {
    var pingRequest = {};
    
    return pingRequest;
}

exports.getEnrollRequest = function (email, customerId, address, birthDate) {
    var enrollRequest = {
    	uuid					:   CustomPreference.ACCOUNT_ID,
    	email					:	email,
    	external_customer_id	:	customerId,
    	first_name				:	firstName,
    	last_name				:	lastName,
    	address_line_1			:	address.address1,
    	address_line_2			:	address.address2,
    	city					:	address.city,
    	state					:	address.state,
    	postal_code				:	address.postalCode,
    	country					:	address.country,
    	home_phone				:	address.homePhone,
    	work_phone				:	address.workPhone,
    	mobile_phone			:	address.mobilePhone,
    	birthdate				:	birthDate,
    	channel					:   Constant.CHANNEL
    };
    
    enrollRequest.sig = Util.getSignature(enrollRequest);
    
    return enrollRequest;
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

exports.getRedeemRewardRequest = function (email, extCustomerId, rewardId) {
    var redeemRewardRequest = {
    	uuid					:	CustomPreference.ACCOUNT_ID,
    	email					:	email,
    	external_customer_id    :   extCustomerId,
    	reward_id				:	rewardId
    };
    
    redeemRewardRequest.sig = Util.getSignature(redeemRewardRequest);
    
    return redeemRewardRequest;
}

exports.getSetSubscriptionTypeRequest = function (email, customerId, subscriptionType) {
    var setSubscriptionTypeRequest = {
    	uuid					:	CustomPreference.ACCOUNT_ID,
    	email					:	email,
    	external_customer_id	:	customerId,
    	subscription_type		:	subscriptionType
    };
    
    setSubscriptionTypeRequest.sig = Util.getSignature(setSubscriptionTypeRequest);
    
    return setSubscriptionTypeRequest;
}
