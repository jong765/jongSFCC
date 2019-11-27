/********************************************************************************************
 *  ApplyCoupons.js
 * 
 *  Apply coupons to the basket.
 *
 *   @input couponList : dw.util.ArrayList   List of coupon objects. code and amount properties are expected in coupon objects.
 *   @input currentBasket : dw.order.Basket
 *   @output success : Boolean
 *   @output priceAdjustment : Number
 *   @output errorMessage : String
 */

var Resource = require('dw/web/Resource');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "ApplyCoupons.js");
 
function execute(args) {
	var response = run(args.couponList, args.currentBasket);
	args.success = response.success;
	args.priceAdjustment = response.priceAdjustment;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(couponList, currentBasket) {
	var response = {};
	try {
		var subtractNonMerch = 0;
		for (var i = 0; i < currentBasket.allProductLineItems.length; i++){
			if (currentBasket.allProductLineItems[i].product.masterProduct.getID() == "GIFTCARD" || currentBasket.allProductLineItems[i].product.masterProduct.getID() == "BOX") {
				subtractNonMerch += currentBasket.allProductLineItems[i].price.decimalValue;
			}
		}
		var cartTotal = currentBasket.adjustedMerchandizeTotalPrice.decimalValue;
		cartTotal = (cartTotal - subtractNonMerch).toFixed(2);
		
		var rewardTotal = getRewardTotal(couponList);
		
		if(rewardTotal <= cartTotal) {
			createPriceAdjustments(couponList, currentBasket, rewardTotal);
			response.success = true;
			response.priceAdjustment = rewardTotal;
			response.errorMessage = null;
		} else {
			response.success = false;
			response.priceAdjustment = 0.00;
			response.errorMessage = "Reward total amount " + rewardTotal + " exceeds the cart total amount " + cartTotal;
		}
	} catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        response = {success:false, priceAdjustment:0.00, errorMessage:null};
    }
	return response;
}

function getRewardTotal(couponList) {
	var rewardTotal = 0.00;
	var couponIter = couponList.iterator();
	while (couponIter.hasNext()) {
		var coupon = couponIter.next();
		rewardTotal += coupon.amount;
	}
	return rewardTotal;
}

function createPriceAdjustments(couponList, basket, rewardTotal) {
	var couponIter = couponList.iterator();
	var counter = 0;
	while (couponIter.hasNext()) {
		var coupon = couponIter.next();
		var newPriceAdjustment = basket.createPriceAdjustment(Resource.msg('loyalty.promotion.id','loyalty',null) + coupon.code);
		newPriceAdjustment.setPriceValue(coupon.amount * -1); 
		newPriceAdjustment.setLineItemText(Resource.msg('loyalty.promotion.description','loyalty',null));
		newPriceAdjustment.custom.loyaltyCouponCode = coupon.code;
	}
	newPriceAdjustment.updateTax(0);
	basket.custom.reward = rewardTotal;
	basket.updateTotals();
}

module.exports = {
	'execute': execute,
	'run': run
}