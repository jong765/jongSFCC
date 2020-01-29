/*******************************************************************************
 * RemoveCoupons.js
 * 
 * Remove applied coupons in the basket.
 * 
 * @input couponCodeList : dw.util.ArrayList List of applied coupon code list.
 * @input currentBasket : dw.order.Basket
 * @output success : Boolean
 * @output errorMessage : String
 */

function execute(args) {
	var response = run(args.couponCodeList, args.currentBasket);
	args.success = response.success;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(couponCodeList, currentBasket) {
	var response = {};
	var priceAdjustments = currentBasket.priceAdjustments;
	var totalReward = 0.00;
	for (var i = 0; i < priceAdjustments.length; i++) {
		if (priceAdjustments[i].promotionID == Resource
				.msg('loyalty.promotion.id', 'loyalty', null)
				+ coupon.code) {
			if (couponCodeList.contains(priceAdjustments[i].custom.loyaltyCouponCode)) {
				basket.removePriceAdjustment(priceAdjustments[i]);
			} else {
				totalReward += priceAdjustments[i].priceValue;
			}
		}
	}
	basket.custom.reward = totalReward;
	basket.updateTotals();
	response.success = true;
	response.errorMessage = null;
	return response;
}

module.exports = {
	'execute' : execute,
	'run' : run
}
