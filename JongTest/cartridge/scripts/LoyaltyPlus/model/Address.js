'use strict';

function Address(address1, address2, city, state, postalCode, country, homePhone, workPhone, mobilePhone) {
	this.address1 = address1;
	this.address2 = address2;
	this.city = city;
	this.state = state;
	this.postalCode = postalCode;
	this.country = country;
	this.homePhone = homePhone;
	this.workPhone = workPhone;
	this.mobilePhone = mobilePhone;
}

module.exports = Address;