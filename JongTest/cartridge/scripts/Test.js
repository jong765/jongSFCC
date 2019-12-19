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
	var productId = "8360513";
	checkInventory(productId);
	return true;
}

function checkCartInventories() {
	var MaoInventoryCheckerSingletonFactory = require('int_pacsun_api/cartridge/scripts/mao/inventory/CheckCartInventories');
	var isAvailable;
	var availabilityAlertStatus = productLineItem.product.availabilityModel.getInventoryRecord().custom.availabilityAlertStatus;
	if (availabilityAlertStatus && availabilityAlertStatus.equalsIgnoreCase("LIMITED_STOCK")) {
		var maoInventoryChecker = MaoInventoryCheckerSingletonFactory.getInstance();
		isAvailable = maoInventoryChecker.check(productLineItem.productID, productLineItem.quantity, pdict.Basket, false);
	} else if (availabilityAlertStatus && availabilityAlertStatus.equalsIgnoreCase("OUT_OF_STOCK")) {
		isAvailable = false;
	}
}

function checkInventory(productId) {
	var product = ProductMgr.getProduct(productId);
	var CheckMaoInventory = require('int_pacsun_api/cartridge/scripts/mao/inventory/CheckInventory');
    var availabilityAlertStatus = product.getAvailabilityModel().getInventoryRecord().custom.availabilityAlertStatus;
    var isAvailable;
    if (availabilityAlertStatus && availabilityAlertStatus.equalsIgnoreCase("LIMITED_STOCK")) {
        isAvailable = CheckMaoInventory.check(product.ID, quantity, shippingMethodId, false);
    } else if (availabilityAlertStatus && availabilityAlertStatus.equalsIgnoreCase("OUT_OF_STOCK")) {
        isAvailable = false;
    }
}

function remove_linebreaks(str ) { 
    return str.replace( /[\r\n]+/gm, "" ); 
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

