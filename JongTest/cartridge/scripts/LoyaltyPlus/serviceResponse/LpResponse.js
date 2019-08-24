'use strict';
var Class = require('../util/Class').Class;

var LpResponse = Class.extend({
	success : false,
	code : null,
	message : null,
	
	init : function(result) {
		var resultObject = result.object;
		this.success = resultObject.success;
		if (resultObject.data.code) this.code = resultObject.data.code;
		this.message = resultObject.data.message;
	}
});

module.exports = LpResponse;