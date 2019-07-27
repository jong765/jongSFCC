'use strict';

const ServiceRegistry = require('dw/svc/ServiceRegistry');
const Status = require('dw/system/Status');
const Site = require('dw/system/Site');
const ApiRequest = require('../request/ApiRequest');
const Util = require('../util/Util');
const UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
const HTTPRequestPart = require('dw/net/HTTPRequestPart');

exports.enroll = function (email, customerId, firstName, lastName, address1, city) {
    let data = {
        urlPath       : UrlPath.ENROLL,
        requestMethod : 'POST',
        request       : ApiRequest.getEnrollRequest(email, customerId, firstName, lastName, address1, city)
    };

    let result = Util.callService(data);
    return result;
};