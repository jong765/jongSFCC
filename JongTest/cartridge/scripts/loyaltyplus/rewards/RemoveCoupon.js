/*******************************************************************************
* RemoveCoupon.js
* 
* Remove applied coupons to the basket.
*
*   @input currentBasket : dw.order.Basket
*   @output success : Boolean
*   @output errorMessage : String
*
*/

function execute(args) {
	var response = run(args.couponCodeList, args.currentBasket);
	args.success = response.success;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(currentBasket) {
	var LpResponse = require('../helper/model/LpResponse');
	var response = {};
	try{
		var priceAdjustments = currentBasket.priceAdjustments;
		var totalReward = 0.00;
		for (var i = 0; i < priceAdjustments.length; i++) {
			if (priceAdjustments[i].promotionID == Resource.msg('loyalty.promotion.id', 'loyalty', null)) {
				currentBasket.removePriceAdjustment(priceAdjustments[i]);
			}
		}
		currentBasket.custom.reward = totalReward;
		currentBasket.updateTotals();
		response = new LpResponse(true, null, null);
	} catch(e) {
		var exception = e;
		var errMessage = exception.message + "\n" + exception.stack;
		logger.error(errMessage);
		response = new LpResponse(false, null, errMessage);
	}
	return response;
}

module.exports = {
	'execute' : execute,
	'run' : run
}