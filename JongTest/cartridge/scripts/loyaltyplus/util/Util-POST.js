/**
 *  Util.js
 *  
 *  Utility functions for loyalty plus 	
 */
'use strict';

var Util = {};
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "Util.js");

Util.callService = function (data) {
	var loyaltyPlusServiceInit = require('../init/LoyaltyPlusServiceInit');
    var service = loyaltyPlusServiceInit.LoyaltyPlusService('loyaltyplus.http.default');
    
    for(var property in data.requestParam){
        service.addParam(property, data.requestParam[property]);
    }
    var result = service.call(data);
    return result;
}

Util.getSignature = function (urlPath, params, requestBody) {
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

    var dataToSign = secretKey + urlPath + "?";

    for (var i=0; i<keys.length; i++){
        dataToSign += keys[i]+params[keys[i]];
    }

    dataToSign = dataToSign.replace(/[[\]]/g, "") + JSON.stringify(requestBody);

    logger.debug("dataToSign: " + dataToSign);
    var encryptor = new MessageDigest('MD5');

    var signature = Encoding.toHex(encryptor.digestBytes(new Bytes(dataToSign)));
    return signature;
}

Util.validateRequiredParams = function (params) {
    var propertyArray = Object.keys(params);
    for (var i=0; i<propertyArray.length; i++){
        if (empty(params[propertyArray[i]])) {
            return {success : false, errorMessage : propertyArray[i] + " is required."}
        }
    }
    return {success : true};
}

Util.copyObject = function (mainObj) {
    let objCopy = {};
    let key;
  
    for (key in mainObj) {
      objCopy[key] = mainObj[key];
    }
    return objCopy;
}

function stringToBytes(str) {
    var ch, st, re = [];
    for (var i = 0; i < str.length; i++ ) {
      ch = str.charCodeAt(i);  // get char 
      st = [];                 // set up "stack"
      do {
        st.push( ch & 0xFF );  // push byte to stack
        ch = ch >> 8;          // shift value down by 1 byte
      }  
      while ( ch );
      // add stack contents to result
      // done because chars have "wrong" endianness
      re = re.concat( st.reverse() );
    }
    // return an array of bytes
    return re;
 }

module.exports = Util;