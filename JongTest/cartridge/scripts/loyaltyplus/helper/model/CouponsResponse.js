/**
 * CouponsResponse.js
 * 
 * CouponsResponse object
 */
'use strict';

function CouponsResponse(codeStatus, success, data, errorMessage) {
	this.success = success;
	this.coupons = [];
	this.errorMessage = errorMessage;

	if (success) {
		for (var i = 0; i < data.length; i++) {
			if (data[i].status.equalsIgnoreCase(codeStatus)) {
				var coupon = {};
				coupon.code = data[i].code;
				coupon.name = data[i].reward.name;
				coupon.amount = data[i].reward.cost;
				coupon.posCode = data[i].reward.pos_code;
				coupon.expiresAt = data[i].expires_at;
				coupon.redeemedAt = data[i].redeemed_at;
				coupon.usedAt = data[i].used_at;
				coupon.status = data[i].status;
				this.coupons.push(coupon);
			}
		}
	} else {
		this.errorMessage = JSON.stringify(data);
	}
}

module.exports = CouponsResponse;