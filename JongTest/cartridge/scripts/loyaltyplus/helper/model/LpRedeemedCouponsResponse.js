/**
 *  LpRedeemedCouponsResponse.js
 * 
 *  LpRedeemedCouponsResponse object 
 */
'use strict';

function LpRedeemedCouponsResponse(success, data, errorMessage) {
	this.success = success;
	this.coupons = [];
	this.errorMessage = errorMessage;
	
	if (success) {
		for (var i=0, j=0 ; i<data.length; i++){
	        if (data[i].status.equalsIgnoreCase("redeemed")) {
	            this.coupons[j++] = data[i];
	        }
	    }
	}
}

module.exports = LpRedeemedCouponsResponse;