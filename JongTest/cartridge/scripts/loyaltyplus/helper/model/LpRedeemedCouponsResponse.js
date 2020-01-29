/**
 * LpRedeemedCouponsResponse.js
 * 
 * LpRedeemedCouponsResponse object
 */
'use strict';

function LpRedeemedCouponsResponse(success, data, errorMessage) {
	this.success = success;
	this.coupons = [];
	this.errorMessage = errorMessage;

	if (success) {
		for (var i = 0; i < data.length; i++) {
			if (data[i].status.equalsIgnoreCase("redeemed")) {
				var coupon = {};
				coupon.code = data[i].code;
				coupon.name = data[i].reward.name;
				coupon.amount = data[i].reward.cost;
				coupon.expiresAt = data[i].expires_at;
				coupon.posCode = data[i].reward.pos_code;
				this.coupons.push(coupon);
			}
		}
	}
}

module.exports = LpRedeemedCouponsResponse;