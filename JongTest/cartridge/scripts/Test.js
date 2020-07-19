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
var txn = require('dw/system/Transaction');
var Calendar = require('dw/util/Calendar');
var SFTPClient = require('dw/net/SFTPClient');
var logger = require('dw/system/Logger').getLogger("jk-test", "Test.js");

function run() {
	inspectOrder();
}

function inspectOrder() {
	var orderNumber = "70046452";
	var order = OrderMgr.getOrder(orderNumber);
	
	var txn = require('dw/system/Transaction');
	txn.wrap(function(){
		order.shipments[0].shippingAddress.phone = null;
	});

	return;
}

function inspectProduct() {
	var productId = "8577934";
	var product = ProductMgr.getProduct(productId);
	var isOnline = product.isOnline();
	var onlineFlag = product.onlineFlag;
	var onlineFrom = product.onlineFrom;
	var onlineTo = product.onlineTo;
	var productOnline = isProductOnline(product);
	var qty = product.availabilityModel.inventoryRecord != null ? product.availabilityModel.inventoryRecord.ATS.value : 0;
	var inStock = ((product.availabilityModel.inStock && qty > 0) ? '1' : '0');
	
	return;
}

function isProductOnline(product) {
	var isProductOnline = false;
	try {
		var onlineFlag = product.onlineFlag;
		
		if (onlineFlag) {
			var onlineFrom = product.onlineFrom? new Calendar(product.onlineFrom) : null;
			var onlineTo = product.onlineTo? new Calendar(product.onlineTo) : null;
			var currentDate = new Calendar(new Date());
			currentDate.add(Calendar.HOUR, 7);
			
			var isAfterOnlineFromDate = onlineFrom == null || currentDate.after(onlineFrom)? true : false;
			var isBeforeOnlineToDate = onlineTo == null || currentDate.before(onlineTo)? true : false; 
		
		    isProductOnline = isAfterOnlineFromDate && isBeforeOnlineToDate;
		} else {
			isProductOnline = false;
		}
	} catch(e) {
		var exception = e;
	    var errMessage = exception.message + "\n" + exception.stack;
	    logger.error(errMessage);
		isProductOnline = product.isOnline();
	}
	
	return isProductOnline;
}

function debugBasketHook() {
	var basketHook = require('int_predictspring_ocapi/cartridge/scripts/basket_hook_scripts.js');
	var orderNumber = "70045330";
	var order = OrderMgr.getOrder(orderNumber);
	var shipment = order.shipments[0];
	var status = basketHook.beforePATCH(order, shipment, null);
	
	return;
}

function fixInvalidData(order: Order) {
	try {
		order.customerName = order.customerName.replace(/[^0-9a-z ]/gi, "");
	} catch(e) {
		var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
	}
}

function iterateEntries(hashMap) {
	var iterator = hashMap.entrySet().iterator();
	while (iterator.hasNext()) {
		try {
			var entry = iterator.next();
			var key = entry.getKey();
			var value = entry.getValue();
	        var test = 1;
		}
		catch (e) {

		}
	}
}

function searchStores(postalCode, currentRequest, maxDistance) {
    var nearestStoreMap = null;
    var distanceUnit = dw.system.Site.getCurrent().getCustomPreferenceValue('storeLookupUnit').value;

    if (maxDistance === null) {
        maxDistance = dw.system.Site.getCurrent().getCustomPreferenceValue('storeLookupMaxDistance').value;
    }

    if (postalCode) {
        var countryCode = dw.system.Site.getCurrent().getCustomPreferenceValue('countryCode').value;
        nearestStoreMap = dw.catalog.StoreMgr.searchStoresByPostalCode(countryCode, postalCode, distanceUnit, maxDistance);
    } else {
        var latitude = currentRequest.geolocation.latitude;
        var longitude = currentRequest.geolocation.longitude;
        nearestStoreMap = dw.catalog.StoreMgr.searchStoresByCoordinates(latitude, longitude, distanceUnit, maxDistance);
    }

    return nearestStoreMap;
}

function ftpKey() {
	var sftpClient = new SFTPClient();
	var keyAlias = "exttransfer2.pacsun.com";
	var hostName = "exttransfer2.pacsun.com";
	var userName = "dwavail_alert";
	sftpClient.setIdentity(dw.crypto.KeyRef(keyAlias));

	var sftpConnectionStatus = sftpClient.connect(hostName, userName, "");

	try {
	    var fileuploadstatus = true;
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

