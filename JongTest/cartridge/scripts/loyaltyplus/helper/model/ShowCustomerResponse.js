/**
 * ShowCustomerResponse.js
 * 
 * ShowCustomerResponse object
 */
'use strict';

function ShowCustomerResponse(success, data, errorMessage) {
	this.success = success;
	this.rewardsAvailable = getRewardsAvailable(data.customer_coupons);
	this.pointsEarned = data.balance;
	this.data = data;
	this.errorMessage = errorMessage;
}

function getRewardsAvailable(coupons) {
	var rewards = 0.0;
	if (coupons) {
		coupons.forEach(function(coupon) {
			if (coupon.status.equalsIgnoreCase("redeemed"))
				rewards += coupon.reward.cost;
		});
	}
	return rewards;
}

module.exports = ShowCustomerResponse;