/**
 *  RecordEventService.js
 * 
 *  Record an event. 	
 */
'use strict';

var OrderMgr = require('dw/order/OrderMgr');
var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var Constant = require('../util/LoyaltyPlusConstants').Constant;
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "RecordEventService.js");

exports.run = function (recordRequestParam) {
    var data = {
        urlPath       : UrlPath.RECORD,
        requestMethod : 'GET',
        requestParam  : getRequestParam(recordRequestParam)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(recordRequestParam) {
	logger.debug("recordRequestParam: " + recordRequestParam.toString());
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    var signatureParam = null;
    
    requestParam.external_customer_id = recordRequestParam.externalCustomerId;
    
    requestParam.type = recordRequestParam.type;
    
    if (recordRequestParam.eventId != "undefined") 
    	requestParam.event_id = recordRequestParam.eventId;
    
    if (recordRequestParam.originalEventId != "undefined") 
    	requestParam.original_event_id = recordRequestParam.originalEventId;
    
    if (recordRequestParam.marketingId != "undefined") 
    	requestParam.sub_channel = Util.getSubChannel(recordRequestParam.marketingId);
    
    if (recordRequestParam.value != "undefined")
    	requestParam.value = recordRequestParam.value;
    
    requestParam.channel = Constant.CHANNEL;
    
    if (recordRequestParam.type.equalsIgnoreCase("Purchase")) {
        signatureParam = Util.copyObject(requestParam);
        var orderNo = recordRequestParam.getEventId();
        var order = OrderMgr.getOrder(orderNo);
        var productLineItems = order.getProductLineItems();
        var parameterString = "";
        var counter = 1;
	    for (var i in productLineItems) {
            var productLineItem = productLineItems[i];
            requestParam["products[" + i + "][price]"] = productLineItem.price.value;
            requestParam["products[" + i + "][product_id]"] = productLineItem.productID;
            requestParam["products[" + i + "][quantity]"] = productLineItem.quantity.value;
            if (counter == 1)
                parameterString += "products" + i + "price" + productLineItem.price.value + "product_id" + productLineItem.productID + "quantity" + productLineItem.quantity.value;
            else
                parameterString += i + "price" + productLineItem.price.value + "product_id" + productLineItem.productID + "quantity" + productLineItem.quantity.value;
            counter++;
        }
        signatureParam[parameterString] = "";
        requestParam.sig = Util.getSignature(signatureParam);
    } else {
        requestParam.sig = Util.getSignature(requestParam);
    } 

    return requestParam;
}