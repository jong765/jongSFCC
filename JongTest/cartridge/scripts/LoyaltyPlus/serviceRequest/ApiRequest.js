'use strict';

var Util = require('../util/Util');
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

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
    	birthdate				:	birthDate
    };
    
    enrollRequest.sig = Util.getSignature(enrollRequest);
    
    return enrollRequest;
}

exports.getRewardRedeemRequest = function (email, rewardId) {
    var rewardRedeemRequest = {
    	uuid					:	CustomPreference.ACCOUNT_ID,
    	email					:	email,
    	reward_id				:	rewardId
    };
    
    rewardRedeemRequest.sig = Util.getSignature(rewardRedeemRequest);
    
    return rewardRedeemRequest;
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
