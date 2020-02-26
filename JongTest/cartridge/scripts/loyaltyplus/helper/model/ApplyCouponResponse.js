/**
 * ApplyCouponResponse.js
 * 
 * ApplyCouponResponse object
 */
'use strict';

function ApplyCouponResponse(success, priceAdjustment, appliedCoupons, errorMessage) {
	this.success = success;
	this.priceAdjustment = priceAdjustment;
	this.appliedCoupons = appliedCoupons;
	this.errorMessage = errorMessage;
}

module.exports = ApplyCouponResponse;