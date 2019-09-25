/**
 *  PointsShowService.js
 * 
 *  Get the number of points a customer could earn from a particular event. 	
 */
'use strict';

var Util = require('../util/Util');
var UrlPath = require('../util/LoyaltyPlusConstants').UrlPath;
var CustomPreference = require('../util/LoyaltyPlusConstants').CustomPreference;

exports.run = function (type, value) {
    var data = {
        urlPath       : UrlPath.POINTS_SHOW,
        requestMethod : 'GET',
        requestParam  : getRequestParam(type, value)
    };

    var result = Util.callService(data);
    return result;
};

function getRequestParam(type, value) {
    var requestParam = {uuid : CustomPreference.ACCOUNT_ID};
    requestParam.type = type;
    requestParam.value = value;
    requestParam.sig = Util.getSignature(requestParam);
    
    return requestParam;
}