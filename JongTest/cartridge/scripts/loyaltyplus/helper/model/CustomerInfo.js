/**
 * CustomerInfo.js
 * 
 * CustomerInfo object
 */
'use strict';

function CustomerInfo() {
	this.externalCustomerId = "undefined";
	this.emailAddress = "undefined";
	this.newEmailAddress = "undefined";
	this.firstName = "undefined";
	this.lastName = "undefined";
	this.address = "undefined";
	this.birthDate = "undefined";
	this.mobilePhone = "undefined";
	this.shoppingPreference = "undefined";
	this.acceptedTermsConditions = "undefined";
	this.memberAttributes = [];
}

CustomerInfo.prototype = {
	setExternalCustomerId : function(value) {
		if (!empty(value))
			this.externalCustomerId = value;
	},

	getExternalCustomerId : function() {
		return this.externalCustomerId;
	},

	setEmailAddress : function(value) {
		if (value != null && !empty(value.trim()))
			this.emailAddress = value;
	},

	getEmailAddress : function() {
		return this.emailAddress;
	},

	setNewEmailAddress : function(value) {
		if (value != null && !empty(value.trim()))
			this.newEmailAddress = value.trim();
	},

	getNewEmailAddress : function() {
		return this.newEmailAddress;
	},

	setFirstName : function(value) {
		if (!empty(value))
			this.firstName = value;
	},

	getFirstName : function() {
		return this.firstName;
	},

	setLastName : function(value) {
		if (!empty(value))
			this.lastName = value;
	},

	getLastName : function() {
		return this.lastName;
	},

	setAddress : function(value) {
		if (!empty(value))
			this.address = value;
	},

	getAddress : function() {
		return this.address;
	},

	setBirthDate : function(value) {
		if (!empty(value))
			this.birthDate = value;
	},

	getBirthDate : function() {
		return this.birthDate;
	},

	setMobilePhone : function(value) {
		if (!empty(value))
			this.mobilePhone = value;
	},

	getMobilePhone : function() {
		return this.mobilePhone;
	},

	setShoppingPreference : function(value) {
		if (!empty(value)) {
			this.shoppingPreference = value;
			this.memberAttributes.push("shoppingPreference");
		}
	},

	getShoppingPreference : function() {
		return this.shoppingPreference;
	},

	setAcceptedTermsConditions : function(value) {
		if (!empty(value) && value == true) {// update only if it is true
			this.acceptedTermsConditions = "true";
			this.memberAttributes.push("acceptedTermsConditions");
		}
	},

	getAcceptedTermsConditions : function() {
		return this.acceptedTermsConditions;
	}
}

module.exports = CustomerInfo;