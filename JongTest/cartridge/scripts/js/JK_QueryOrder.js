'use strict'

 var OrderMgr = require('dw/order/OrderMgr');

function execute(args) {
	var query = "status =" + Order.ORDER_STATUS_CREATED + "d";
	query += " AND creationDate >= " + getSearchStartDate(parameters);
	var orderIterator = OrderMgr.queryOrders(query, "orderNo desc", null);
	
	if (!empty(orderIterator)) {
		while (orderIterator.hasNext()) {
			var order = orderIterator.next();
		}
	}
	
    return PIPELET_NEXT;
}

function getSearchStartDate(args) {
	var searchDays = args.searchDays * -24;
	var searchCal = new dw.util.Calendar();
	searchCal.add(Calendar.HOUR, searchDays);
	var searchDateStart = searchCal.time.getFullYear() + "-" + (searchCal.time.getMonth()+1) + "-" + searchCal.time.getDate();
	searchDateStart += "T00:00:00";
	return searchDateStart;
}

module.exports = {
	'execute': execute
}