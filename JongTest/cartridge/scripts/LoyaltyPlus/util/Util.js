'use strict';

const MessageDigest = require('dw/crypto/MessageDigest');
const Encoding = require('dw/crypto/Encoding');
const Bytes = require('dw/util/Bytes');
const CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

var Util = {};

Util.callService = function (data) {
	let loyaltyPlusServiceInit = require('~/cartridge/scripts/LoyaltyPlus/init/LoyaltyPlusServiceInit');
    let service = loyaltyPlusServiceInit.LoyaltyPlusService('loyaltyplus.http.default');
    service.addParam("uuid", data.uuid);
    service.addParam("sig", data.sig);
    let response = service.call(data);
    return response;
}

Util.getSignature = function (params) {
    let secretKey = CustomPreference.SECRET_KEY;

    let keys = [];
    for (var key in params) {
        if (params.hasOwnProperty(key)) { 
            keys.push(key); 
        }
    };
    keys.sort();

    let dataToSign = secretKey;

    for (var i=0; i<keys.length; i++){
        dataToSign += keys[i]+params[keys[i]];
    }

    let encryptor : MessageDigest = new MessageDigest('MD5');
    let signature = Encoding.toHex(encryptor.digestBytes(new Bytes(dataToSign)));
    return signature;
}

module.exports = Util;