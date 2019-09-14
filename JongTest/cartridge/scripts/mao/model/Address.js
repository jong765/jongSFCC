function Address() {
	this.Address1 = "";
	this.Address2 = "";
	this.City = "";
	this.FirstName = "";
	this.LastName = "";
	this.PostalCode = "";
	this.State = "";
	this.Country = "";
	this.Email = "";
}

Address.prototype = 
{
	setAddress1 : function(value){
		this.Address1 = value;
	},

	getAddress1 : function(){
		return this.Address1;
	},

	setAddress2 : function(value){
		this.Address2 = value;
	},
		
	getAddress2 : function(){
		return this.Address2;
	},

	setCity : function(value){
		this.City = value;
	},
		
	getCity : function(){
		return this.City;
	},

	setFirstName : function(value){
		this.FirstName = value;
	},
		
	getFirstName : function(){
		return this.FirstName;
	},

	setLastName : function(value){
		this.LastName = value;
	},
		
	getLastName : function(){
		return this.LastName;
	},

	setPostalCode : function(value){
		this.PostalCode = value;
	},
		
	getPostalCode : function(){
		return this.PostalCode;
	},

	setState : function(value){
		this.State = value;
	},
		
	getState : function(){
		return this.State;
	},

	setCountry : function(value){
		this.Country = value;
	},
		
	getCountry : function(){
		return this.Country;
	},

	setEmail : function(value){
		this.Email = value;
	},
		
	getEmail : function(){
		return this.Email;
	}
}

module.exports = Address;