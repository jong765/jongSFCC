/*******************************************************************************
* ApplyCoupon.js
* 
* Apply coupon to the basket.
*
*   @input currentBasket : dw.order.Basket
*   @input externalCustomerId : String
*   @output success : Boolean
*   @output priceAdjustment : Number
*   @output appliedCoupons : Array
*   @output errorMessage : String
*/
 
 var Resource = require('dw/web/Resource');
 var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "ApplyCoupons.js");
 
function execute(args) {
	var response = run(args.currentBasket, args.externalCustomerId);
	args.success = response.success;
	args.priceAdjustment = response.priceAdjustment;
	args.appliedCoupons = response.appliedCoupons;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(currentBasket, externalCustomerId) {
	var ApplyCouponResponse = require('../helper/model/ApplyCouponResponse');
	var response = {};
	try{
		var basket = currentBasket;
		var subtractNonMerch = 0;
		for (var i = 0; i < basket.allProductLineItems.length; i++){
			if (basket.allProductLineItems[i].product.masterProduct.getID() == "GIFTCARD" || basket.allProductLineItems[i].product.masterProduct.getID() == "BOX") {
				subtractNonMerch += basket.allProductLineItems[i].price.decimalValue;
			}
		}
		var cartTotal = basket.adjustedMerchandizeTotalPrice.decimalValue;
		cartTotal = (cartTotal - subtractNonMerch).toFixed(2);
		
		var result = require('GetRedeemedCustomerCoupons').run(externalCustomerId, null);
		
		if (result.success) {
			var couponList = result.coupons;
			
			var totalRewards = 0;
			var appliedCoupons = [];
			
			for (var i = 0; i < couponList.length; i++){
				totalRewards += couponList[i].amount;
				appliedCoupons[i] = couponList[i].code;
			} 
			var initDiscount = 0; 
			if(totalRewards <= cartTotal) {
				initDiscount = totalRewards;	
			} else {
				initDiscount = cartTotal;	
			}
			
			var mod = initDiscount%5;
			
			var discount = initDiscount - mod;
		
			var newPriceAdjustment = basket.createPriceAdjustment(Resource.msg('loyalty.promotion.id','loyalty',null));
			newPriceAdjustment.setPriceValue(discount * -1); 
			//newPriceAdjustment.setLineItemText("Description test");
			newPriceAdjustment.setLineItemText(Resource.msg('loyalty.promotion.description','loyalty',null));
			var taxRate : Number = basket.getMerchandizeTotalTax().value/basket.merchandizeTotalNetPrice.value;
			newPriceAdjustment.updateTax(0);
			basket.custom.reward = discount;
			basket.updateTotals();
			response = new ApplyCouponResponse(true, discount, appliedCoupons, result.errorMessage);
		} else {
			response = new ApplyCouponResponse(false, 0.00, null, result.errorMessage);
		}
	} catch(e) {
		var exception = e;
		var errMessage = exception.message + "\n" + exception.stack;
		logger.error(errMessage);
		response = new ApplyCouponResponse(false, 0.00, null, errMessage);
	}
		
   return response;
}

module.exports = {
		'execute' : execute,
		'run' : run
}
