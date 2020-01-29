/**
 * RecordRequestParam.js
 * 
 * RecordRequestParam object
 */
'use strict';

function RecordRequestParam(externalCustomerId, type, marketingId) {
	this.externalCustomerId = externalCustomerId;
	this.type = type;
	this.value = "undefined";
	this.eventId = "undefined";
	this.originalEventId = "undefined";

	if (!empty(marketingId))
		this.marketingId = marketingId.trim();
	else
		this.marketingId = "undefined";
}

RecordRequestParam.prototype = {
	setExternalCustomerId : function(value) {
		this.externalCustomerId = value;
	},

	getExternalCustomerId : function() {
		return this.externalCustomerId;
	},

	setType : function(value) {
		this.type = value;
	},

	getType : function() {
		return this.type;
	},

	setValue : function(value) {
		this.value = value;
	},

	getValue : function() {
		return this.value;
	},

	setEventId : function(value) {
		this.eventId = value;
	},

	getEventId : function() {
		return this.eventId;
	},

	setOriginalEventId : function(value) {
		this.originalEventId = value;
	},

	getOriginalEventId : function() {
		return this.originalEventId;
	},

	setMarketingId : function(value) {
		this.marketingId = value;
	},

	getMarketingId : function() {
		return this.marketingId;
	},

	toString : function() {
		return JSON.stringify(this);
	}
}

module.exports = RecordRequestParam;