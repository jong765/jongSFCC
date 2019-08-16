'use strict'

 var OrderMgr = require('dw/order/OrderMgr');

function execute(args) {
    var order = OrderMgr.getOrder("70038127");
    loopThroughElements(order);
    return PIPELET_NEXT;
}

function loopThroughElements(order) {
	var productLineItems = order.getProductLineItems();
	for (var i in productLineItems) {
		var productLineItem = productLineItems[i];
	}
}

module.exports = {
	'execute': execute
}