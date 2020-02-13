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
var Transaction = require('dw/system/Transaction');
var SFTPClient = require('dw/net/SFTPClient');
var logger = require('dw/system/Logger').getLogger("jk-test", "Test.js");

function run() {
	ftpKey();
	return true;
}

function ftpKey() {
	var sftpClient = new SFTPClient();
	var keyAlias = "exttransfer2.pacsun.com";
	var hostName = "exttransfer2.pacsun.com";
	var userName = "dwavail_alert";
	sftpClient.setIdentity(dw.crypto.KeyRef(keyAlias));

	var sftpConnectionStatus = sftpClient.connect(hostName, userName, "");

	try {
	    var fileuploadstatu = true;
	} catch (e) {}

	finally {
		sftpClient.disconnect();
	}
}

function fixMissingShipTo(basket, currentForms) {
	Transaction.wrap(function(){
		var billingAddress = currentForms.billing.billingAddress.addressFields;
		var shippingAddress = basket.shipments[0].shippingAddress;
		// if basket ship to address is missing, copy from basket bill to
		// address
		if (shippingAddress.address1 && shippingAddress.city) {
			shippingAddress.address1 = billingAddress.address1.value;
			shippingAddress.address2 = billingAddress.address2? billingAddress.address2.value : ""
			shippingAddress.city = billingAddress.city.value;
			shippingAddress.countryCode = billingAddress.country.value;
			shippingAddress.phone = billingAddress.phone? billingAddress.phone.value : "";
			shippingAddress.postalCode = billingAddress.postal.value;
			shippingAddress.stateCode = billingAddress.states.state.htmlValue;
		}
		if (shippingAddress.firstName && shippingAddress.lastName) {
			shippingAddress.firstName = billingAddress.firstName.value;
			shippingAddress.lastName = billingAddress.lastName.value;
		}
	});
}

function getOrder(orderNumber) {
	var order = OrderMgr.getOrder(orderNumber);
	return order;
}

function isLimitedStock(product) {
	var CheckInventoryUtil = require('int_pacsun_api/cartridge/scripts/mao/inventory/CheckInventoryUtil');
	var limitedStock = CheckInventoryUtil.isLimitedStock(product);
	return limitedStock;
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

