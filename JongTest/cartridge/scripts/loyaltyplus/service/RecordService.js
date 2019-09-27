/**
 *  RecordService.js
 * 
 *  Record an event. 	
 */
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
var Constant = require('../util/LoyaltyPlusConstants').Constant;

exports.run = function (externalCustomerId, type, order) {
    var data = {
        urlPath       : UrlPath.RECORD,
        requestMethod : 'GET',
        requestParam  : getRequestParam(externalCustomerId, type, order)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(externalCustomerId, type, order) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    if (externalCustomerId) requestParam.external_customer_id = externalCustomerId;
    if (type) requestParam.type = type;
    if (type.equalsIgnoreCase("Purchase")) {
        requestParam.value = order.totalGrossPrice.value;
        requestParam.event_id = order.orderNo;
        var productLineItems = order.getProductLineItems();
	    for (var i in productLineItems) {
            var productLineItem = productLineItems[i];
            requestParam["products[i][product_id]"] = productLineItem.productID;
            requestParam["products[i][price]"] = productLineItem.price.value;
            requestParam["products[i][quantity]"] = productLineItem.quantity.value;
        }
    }
    requestParam.channel = Constant.CHANNEL;	
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}