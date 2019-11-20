/**
 *  Address.js
 * 
 *  Address object 
 */
'use strict';

function Address() {
	this.addressLine1 = "undefined";
	this.addressLine2 = "undefined";
	this.city = "undefined";
	this.postalCode = "undefined";
	this.state = "undefined";
	this.country = "undefined";
}

Address.prototype = 
{
	setAddressLine1 : function(value){
		if (value == null) value = "";
		this.addressLine1 = value;
	},

	getAddressLine1 : function(){
		return this.addressLine1;
	},

	setAddressLine2 : function(value){
		if (value == null) value = "";
		this.addressLine2 = value;
	},
		
	getAddressLine2 : function(){
		return this.addressLine2;
	},

	setCity : function(value){
		if (!empty(value))
			this.city = value;
	},
		
	getCity : function(){
		return this.city;
	},

	setPostalCode : function(value){
		if (!empty(value))
			this.postalCode = value;
	},
		
	getPostalCode : function(){
		return this.postalCode;
	},

	setState : function(value){
		if (!empty(value))
			this.state = value;
	},
		
	getState : function(){
		return this.state;
	},

	setCountry : function(value){
		if (!empty(value))
			this.country = value;
	},
		
	getCountry : function(){
		return this.country;
	}
}

module.exports = Address;