'use strict';
var Class = require('../util/Class').Class;

var Order = Class.extend({
	orderId: null,
	fulfillmentStatus: null
});

module.exports = Order;