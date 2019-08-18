'use strict';

var Util = require('../util/Util');

exports.getTiersRequest = function (accountId) {
    var tiersRequest = {
    	uuid	:	accountId
    };
    
    tiersRequest.sig = Util.getSignature(tiersRequest);
    
    return tiersRequest;
}
