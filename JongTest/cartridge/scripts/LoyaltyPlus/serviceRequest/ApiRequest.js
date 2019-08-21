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

exports.getEnrollRequest = function (customer) {
    var enrollRequest = {
    	uuid					:   CustomPreference.ACCOUNT_ID,
    	email					:	customer.emailAddress,
    	external_customer_id	:	customer.extCustomerId,
    	name					: 	customer.name,
    	first_name				:	customer.firstName,
    	last_name				:	customer.lastName,
    	address_line_1			:	customer.address.address1,
    	address_line_2			:	customer.address.address2,
    	city					:	customer.address.city,
    	state					:	customer.address.state,
    	postal_code				:	customer.address.postalCode,
    	country					:	customer.address.country,
    	home_phone				:	customer.address.homePhone,
    	work_phone				:	customer.address.workPhone,
    	mobile_phone			:	customer.address.mobilePhone,
    	birthdate				:	customer.birthDate,
    	channel					:   Constant.CHANNEL,
    	enrolled_at				:	Util.getCurrentDate()
    };
    
    enrollRequest.sig = Util.getSignature(enrollRequest);
    
    return enrollRequest;
}

exports.getPingRequest = function () {
    var pingRequest = {};
    
    return pingRequest;
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
