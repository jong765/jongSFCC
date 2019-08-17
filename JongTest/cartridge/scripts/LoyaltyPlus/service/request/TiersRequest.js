'use strict';

const Util = require('../util/Util');

exports.getTiersRequest = function (accountId) {
    let tiersRequest = {
    	uuid	:	accountId
    };
    
    tiersRequest.sig = Util.getSignature(tiersRequest);
    
    return tiersRequest;
}
