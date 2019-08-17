'use strict'

 var OrderMgr = require('dw/order/OrderMgr');

function execute(args) {
    var emailArray = ["j1@yahoo.com","j2@yahoo.com"];
    loopThroughElements(emailArray);
    return PIPELET_NEXT;
}

function loopThroughElements(emailArray) {
	for (var i = 0; i < emailArray.length; i++) {
		console.log(emailArray[i]);
	}
}

module.exports = {
	'execute': execute
}