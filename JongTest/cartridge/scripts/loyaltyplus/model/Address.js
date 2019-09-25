/**
 *  Address.js
 * 
 *  Address object 
 */
'use strict';

function Address(addressLine1, addressLine2, city, postalCode, state, country) {
	this.addressLine1 = addressLine1;
	this.addressLine2 = addressLine2;
	this.city = city;
	this.postalCode = postalCode;
	this.state = state;
	this.country = country;
}

Address.prototype = 
{
	setAddressLine1 : function(value){
		this.addressLine1 = value;
	},

	getAddressLine1 : function(){
		return this.addressLine1;
	},

	setAddressLine2 : function(value){
		this.addressLine2 = value;
	},
		
	getAddressLine2 : function(){
		return this.addressLine2;
	},

	setCity : function(value){
		this.city = value;
	},
		
	getCity : function(){
		return this.city;
	},

	setPostalCode : function(value){
		this.postalCode = value;
	},
		
	getPostalCode : function(){
		return this.postalCode;
	},

	setState : function(value){
		this.state = value;
	},
		
	getState : function(){
		return this.state;
	},

	setCountry : function(value){
		this.country = value;
	},
		
	getCountry : function(){
		return this.country;
	}
}

module.exports = Address;