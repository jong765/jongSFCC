'use strict'

var ShowCustomer = require('../customerRequest/ShowCustomer');

function execute(args) {
	var emailAddress = "jkim@pacsun.com";
	var extCustomerId = null;
	var vendor = null;
	var vendorId = null;
	var include = null;
	
    var response = ShowCustomer.run(emailAddress, extCustomerId, vendor, vendorId, include);
    return PIPELET_NEXT;
}

module.exports = {
	'execute': execute
}