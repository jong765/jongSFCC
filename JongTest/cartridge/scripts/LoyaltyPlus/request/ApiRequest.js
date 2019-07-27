'use strict';

const Util = require('../util/Util');

exports.getEnrollRequest = function (accountId, email, customerId, address) {
    let enrollRequest = {
    	uuid					:   accountId,
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
    	mobile_phone			:	address.mobilePhone
    };
    
    enrollRequest.sig = Util.getSignature(enrollRequest);
    
    return enrollRequest;
}

exports.getRewardRedeemRequest = function (accountId, email, rewardId) {
    let rewardRedeemRequest = {
    	uuid					:	accountId,
    	email					:	email,
    	reward_id				:	rewardId
    };
    
    rewardRedeemRequest.sig = Util.getSignature(rewardRedeemRequest);
    
    return rewardRedeemRequest;
}

exports.getSetSubscriptionTypeRequest = function (accountId, email, customerId, subscriptionType) {
    let setSubscriptionTypeRequest = {
    	uuid					:	accountId,
    	email					:	email,
    	external_customer_id	:	customerId,
    	subscription_type		:	subscriptionType
    };
    
    setSubscriptionTypeRequest.sig = Util.getSignature(setSubscriptionTypeRequest);
    
    return setSubscriptionTypeRequest;
}
