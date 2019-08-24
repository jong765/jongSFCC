'use strict';
var Class = require('../util/Class').Class;
var LpResponse = require('../serviceResponse/LpResponse');

var CustomerShowResponse = LpResponse.extend({
	balance : null,
	actionNeededForNextTier : null,
	memberAttributes : null,
	
	init : function(result) {
		this._super(result);
		var resultObject = result.object;
		this.balance = resultObject.balance;
		this.actionNeededForNextTier = resultObject.actions_needed_for_next_tier;
		this.memberAttributes = resultObject.member_attributes;
	}
});

module.exports = CustomerShowResponse;