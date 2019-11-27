'use strict'

/**
 * Controller : Test
 *
 * @module controllers/Test
 */
var BasketMgr = require('dw/order/BasketMgr');
var OrderMgr = require('dw/order/OrderMgr');
var ProductMgr = require('dw/catalog/ProductMgr');
var PromotionMgr = require('dw/campaign/PromotionMgr');
var logger = require('dw/system/Logger').getLogger("jk-test", "Test.js");

function run() {
	var response = getProductPromotion();
	
	logResponse(response);
	return true;
}

function logResponse(response) {
	logger.debug("response: " + JSON.stringify(response));
	return;
}

function getProductPromotion() {
	var response = null;
	var product = ProductMgr.getProduct("0703468680174");
	var promotions = PromotionMgr.getActivePromotions().getProductPromotions(product);
	var currentPromotion = null;
	var previousStartDate = null;
	for (var i in promotions) {
		var promotion = promotions[i];
		if (promotion.active && promotion.promotionClass == "PRODUCT") {
			if (currentPromotion == null || promotion.startDate > previousStartDate) {
				var currentPromotion = promotion;
				previousStartDate = promotion.startDate;
			}
		}
	}
	return currentPromotion;
}

module.exports.run = run;

