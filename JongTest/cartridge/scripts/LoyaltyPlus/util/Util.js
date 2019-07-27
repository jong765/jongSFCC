'use strict';

const MessageDigest = require('dw/crypto/MessageDigest');
const Encoding = require('dw/crypto/Encoding');
const Bytes = require('dw/util/Bytes');

exports.callService = function (data) {
	let loyaltyPlusServiceInit = require('~/cartridge/scripts/LoyaltyPlus/init/LoyaltyPlusServiceInit');
    let response = loyaltyPlusServiceInit.LoyaltyPlusService('loyaltyplus.http.default').call(data);
    return response;
}

exports.getSignature = function (params) {
    let secretKey = "12345678901234567890123456789012";

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