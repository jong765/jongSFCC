/**
 * CheckCartInventories.js
 * 
 *  Returns true if the product in the current cart is available in MAO global inventory.
 *  This program loads inventory availability lookup for all products in the cart only once.
 * 
 */

var HashMap = require('dw/util/HashMap');
var LogUtils = require('../util/LogUtils');
var Logger = LogUtils.getLogger("CheckCartInventories.js");

var CartInventoryCheckerSingletonFactory = (function () {
    var instance;
 
    function createInstance() {
        var cartInventoryChecker = new CartInventoryChecker();
        return cartInventoryChecker;
    }
 
	//Singleton - make sure to create only one instance.
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
 
function CartInventoryChecker() {
	this.inventoryMap = null;
}

CartInventoryChecker.prototype = {
	check : function (productId, quantity, basket, internationalOrder) {
		var isAvailable = true;
		try {
			//Load inventory lookup only once for all products in backet
			if (this.inventoryMap == null) {
				var shippingMethodId = basket.shipments[0].shippingMethodID;
				this.getMaoInventories(basket.productLineItems, productId, quantity, shippingMethodId, internationalOrder);
			} 
			isAvailable = this.inventoryMap.get(productId);
		} catch (e) {
			var exception = e;
		    var errMessage = exception.message + "\n" + exception.stack;
			Logger.error(errMessage);
		}
	    return isAvailable;
	},
	getMaoInventories : function (productLineItems, productId, quantity, shippingMethodId, internationalOrder) {
		var isAvailable = true;
		try {
			var requestItems = new Array();
			var productLineItemsIT = productLineItems.iterator();
			while (productLineItemsIT.hasNext()) {
				var productLineItem = productLineItemsIT.next();
				var availabilityAlertStatus = productLineItem.product.availabilityModel.getInventoryRecord().custom.availabilityAlertStatus;
				if (internationalOrder || (availabilityAlertStatus && availabilityAlertStatus.equalsIgnoreCase("LIMITED_STOCK"))) {
					var productId = productLineItem.productID;
					requestItems.push(productId);
				}
			}
			this.inventoryMap = new HashMap();
			// Call MAO availabilityDetail API
			var expeditedShippingMethods = dw.system.Site.current.preferences.custom.maoExpeditedShippingMethods;
			var availabilityDetails = require('../service/AvailabilityDetailService').getAvailabilityDetail(requestItems, internationalOrder);
		
			for (var i = 0; i < availabilityDetails.length; i++) {
				var availabilityDetail = availabilityDetails[i];
				if (expeditedShippingMethods.indexOf(shippingMethodId) != -1) {
					isAvailable = availabilityDetail.quantity.DistributionCenters >= quantity ? true : false;
				} else {
					isAvailable = availabilityDetail.totalQuantity >= quantity ? true : false;
				}
				this.inventoryMap.put(availabilityDetail.itemId, isAvailable);
			}
		} catch (e) {
			//If API fails, load items with available status by default
			for (var i = 0; i < requestItems.length; i++) {
				this.inventoryMap.put(requestItems[i], true);
			}
			var exception = e;
		    var errMessage = exception.message + "\n" + exception.stack;
			Logger.error(errMessage);
		}
	    return isAvailable;
	}
}

module.exports = CartInventoryCheckerSingletonFactory;