'use strict';

const Mac = require('dw/crypto/Mac');
const MessageDigest = require('dw/crypto/MessageDigest');
const Encoding = require('dw/crypto/Encoding');

exports.callService = function (data) {
	let loyaltyPlusServiceInit = require('~/cartridge/scripts/LoyaltyPlus/init/LoyaltyPlusServiceInit');
    let response = loyaltyPlusServiceInit.LoyaltyPlusService('loyaltyplus.http.default').call(data);
    return response;
}

exports.getSignature = function (params) {
    let secretKey = "mRz2DOoknIiXqodxijyBTKn7fwIHUFcS";
    let	signature = "";
    let mac = new Mac(Mac.HMAC_MD5);

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

    let dataToSignBytes = new dw.util.Bytes(dataToSign, "UTF-8");
    let secretKeyBytes = Encoding.fromBase64(secretKey);
    let encryptor = new MessageDigest('MD5');
    let hash = dw.crypto.Encoding.toHex(encryptor.digestBytes(new dw.util.Bytes(dataToSign)));

    if(!empty(dataToSign) && !empty(secretKey)){ 
        hmcaMD5Hash = mac.digest(dataToSignBytes, secretKeyBytes);
        signature = Encoding.toHex(hmcaMD5Hash);
    }
    
    return signature;
}