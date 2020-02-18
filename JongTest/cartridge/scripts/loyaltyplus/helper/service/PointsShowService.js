/**
 * PointsShowService.js
 * 
 * Get the number of points a customer could earn from a particular event.
 */
'use strict';

var Util = require('../util/Util');

exports.run = function(type, lineItemCtnr) {
	var data = {
		urlPath : require('../util/LoyaltyPlusConstants').UrlPath.POINTS_SHOW,
		requestMethod : 'GET',
		requestParam : getRequestParam(type, lineItemCtnr)
	};

	var result = Util.callService(data);
	return result;
};

function getRequestParam(type, lineItemCtnr) {
	var requestParam = {
		uuid : require('../util/LoyaltyPlusConstants').CustomPreference.ACCOUNT_ID
	};
	var signatureParam = null;

	requestParam.type = type;
	requestParam.value = lineItemCtnr.adjustedMerchandizeTotalNetPrice.value;

	signatureParam = Util.copyObject(requestParam);

	var productLineItems = lineItemCtnr.getProductLineItems();
	var parameterString = "";

	var counter = 1;
	for ( var i in productLineItems) {
		var productLineItem = productLineItems[i];
		requestParam["products[" + i + "][price]"] = productLineItem.price.value;
		requestParam["products[" + i + "][product_id]"] = productLineItem.productID;
		requestParam["products[" + i + "][quantity]"] = productLineItem.quantity.value;
		var product = require('dw/catalog/ProductMgr').getProduct(productLineItem.productID);
		var productCategory = product.custom.classCode;
		if (product.brand != null) {
			requestParam["products[" + i + "][brands]"] = product.brand;
		}
		if (productCategory != null) {
			requestParam["products[" + i + "][categories]"] = productCategory;
		}
		if (counter == 1) {
			parameterString += "products" + i;
		} else {
			parameterString += i;
		}
		if (product.brand != null)
			parameterString += "brands" + product.brand;
		if (productCategory != null)
			parameterString += "categories" + productCategory;
		parameterString += "price" + productLineItem.price.value + "product_id"
				+ productLineItem.productID + "quantity" + productLineItem.quantity.value;
		counter++;
	}
	signatureParam[parameterString] = "";
	requestParam.sig = Util.getSignature(signatureParam);

	return requestParam;
}