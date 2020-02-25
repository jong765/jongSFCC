/**
 * ApplyCouponResponse.js
 * 
 * ApplyCouponResponse object
 */
'use strict';

function ApplyCouponResponse(success, priceAdjustment, errorMessage) {
	this.success = success;
	this.priceAdjustment = priceAdjustment;
	this.errorMessage = errorMessage;
}

module.exports = ApplyCouponResponse;