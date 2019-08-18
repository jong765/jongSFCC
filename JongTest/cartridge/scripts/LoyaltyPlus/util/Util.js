'use strict';

var MessageDigest = require('dw/crypto/MessageDigest');
var Encoding = require('dw/crypto/Encoding');
var Bytes = require('dw/util/Bytes');
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

var Util = {};

Util.callService = function (data) {
	var loyaltyPlusServiceInit = require('~/cartridge/scripts/LoyaltyPlus/init/LoyaltyPlusServiceInit');
    var service = loyaltyPlusServiceInit.LoyaltyPlusService('loyaltyplus.http.default');
    service.addParam("uuid", data.uuid);
    service.addParam("sig", data.sig);
    var response = service.call(data);
    return response;
}

Util.getSignature = function (params) {
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

    var encryptor : MessageDigest = new MessageDigest('MD5');
    var signature = Encoding.toHex(encryptor.digestBytes(new Bytes(dataToSign)));
    return signature;
}

module.exports = Util;