'use strict';
var Class = require('../util/Class').Class;
var LpResponse = require('../serviceResponse/LpResponse');

var CustomerEventsResponse = LpResponse.extend({
	createdAt : null,
	points : null,
	value : null,
	eventType : null,
	
	init : function(result) {
		this._super(result);
		var resultObject = result.object;
		this.createdAt = resultObject.created_at;
		this.points = resultObject.points;
		this.value = resultObject.value;
		this.eventType = resultObject.event_type;
	}
});

module.exports = CustomerEventsResponse;