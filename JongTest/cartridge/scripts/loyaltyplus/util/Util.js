/**
 *  Util.js
 *  
 *  Utility functions for loyalty plus 	
 */
'use strict';

var Util = {};
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "Util.js");

Util.callService = function(data) {
	var loyaltyPlusServiceInit = require('../init/LoyaltyPlusServiceInit');
    var service = loyaltyPlusServiceInit.LoyaltyPlusService('loyaltyplus.http.default');
    
    for(var property in data.requestParam){
        service.addParam(property, data.requestParam[property]);
    }
    var result = service.call(data);
    return result;
}

Util.getSignature = function(params) {
    var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;
    var MessageDigest = require('dw/crypto/MessageDigest');
    var Encoding = require('dw/crypto/Encoding');
    var Bytes = require('dw/util/Bytes');
    var secretKey = CustomPreference.SECRET_KEY;

    var keys = [];
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            keys.push(key); 
        }
    };
    keys.sort();

    var dataToSign = secretKey;

    for (var i=0; i<keys.length; i++){
        dataToSign += keys[i]+params[keys[i]];
    }

    dataToSign = dataToSign.replace(/[[\]]/g, "");

    logger.debug("dataToSign: " + dataToSign);
    var encryptor = new MessageDigest('MD5');
    var signature = Encoding.toHex(encryptor.digestBytes(new Bytes(dataToSign)));
    return signature;
}

Util.validateRequiredParams = function(params) {
    var propertyArray = Object.keys(params);
    for (var i=0; i<propertyArray.length; i++){
        if (empty(params[propertyArray[i]])) {
            return {success : false, errorMessage : propertyArray[i] + " is required."}
        }
    }
    return {success : true};
}

Util.copyObject = function(mainObj) {
    let objCopy = {};
    let key;
  
    for (key in mainObj) {
      objCopy[key] = mainObj[key];
    }
    return objCopy;
}

Util.getSubChannel = function(marketingId) {
	var subChannel = null;
	switch (marketingId) {
		case "DSK":
			subChannel = "Desktop";
			break;
		case "MOB":
			subChannel = "Mobile Web";
			break;
		default:
			break;
	}
	return subChannel;
}

module.exports = Util;