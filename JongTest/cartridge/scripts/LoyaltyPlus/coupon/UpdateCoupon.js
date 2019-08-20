/**
 * UpdateCoupon.js
 * 
 *  Update status of a coupon code.
 *
 *   @input couponCode : String
 *   @input status : String
 *   @input extCustomerId : String
 * 
 */

var CouponService = require('../service/CouponService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "UpdateCoupon.js");

function execute(args) {
	var updateCouponResponse = updateCoupon(args);
    return updateCouponResponse.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function updateCoupon(args) {
    var updateCouponResponse = {
    	success 		: 	false
    };

    try {
    	var result = CouponService.updateCoupon(args.couponCode, args.status, args.extCustomerId);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return updateCouponResponse;
}

module.exports = {
    'execute': execute,
    'updateCoupon': updateCoupon
}