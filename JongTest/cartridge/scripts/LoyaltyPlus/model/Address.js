'use strict';
var Class = require('../util/Class').Class;

var Address = Class.extend({
	address1	:	null,
	address2	: 	null,
	city		:	null,
	state		:	null,
	postalCode	:	null,
	country		:	null,
	homePhone	:	null,
	workPhone	:	null,
	mobilePhone	:	null
});

module.exports = Address;