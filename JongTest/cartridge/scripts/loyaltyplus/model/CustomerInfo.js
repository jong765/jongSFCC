/**
 *  CustomerInfo.js
 * 
 *  CustomerInfo object 
 */
'use strict';

function CustomerInfo() {
	this.externalCustomerId = "undefined"; //These initial values must be "undefined" string, not undefined.
	this.newEmailAddress = "undefined";
	this.firstName = "undefined";
	this.lastName = "undefined";
	this.address = "undefined";
	this.birthDate = "undefined";
	this.mobilePhone = "undefined";
	this.shoppingPreference = "undefined";
	this.lastVisitDate = "undefined";
}

CustomerInfo.prototype = 
{
	setExternalCustomerId : function(value){
		this.externalCustomerId = value;
	},

	getExternalCustomerId : function(){
		return this.externalCustomerId;
	},
	
	setNewEmailAddress : function(value){
		this.newEmailAddress = value;
	},

	getNewEmailAddress : function(){
		return this.newEmailAddress;
	},
	
	setFirstName : function(value){
		this.firstName = value;
	},

	getFirstName : function(){
		return this.firstName;
	},
	
	setLastName : function(value){
		this.lastName = value;
	},

	getLastName : function(){
		return this.lastName;
	},
		
	setAddress : function(value){
		this.address = value;
	},

	getAddress : function(){
		return this.address;
	},
	
	setBirthDate : function(value){
		this.birthDate = value;
	},

	getBirthDate : function(){
		return this.birthDate;
	},
	
	setMobilePhone : function(value){
		this.mobilePhone = value;
	},

	getMobilePhone : function(){
		return this.mobilePhone;
	},
	
	setShoppingPreference : function(value){
		this.shoppingPreference = value;
	},

	getShoppingPreference : function(){
		return this.shoppingPreference;
	},

	setLastVisitDate : function(value){
		this.lastVisitDate = value;
	},
		
	getLastVisitDate : function(){
		return this.lastVisitDate;
	}
}

module.exports = CustomerInfo;