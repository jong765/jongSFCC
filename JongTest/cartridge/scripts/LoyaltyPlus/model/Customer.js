'use strict';

function Customer(emailAddress, extCustomerId, firstName, lastName, birthDate, address) {
	this.emailAddress = emailAddress,
	this.extCustomerId = extCustomerId,
	this.firstName = firstName,
	this.lastName = lastName,
	this.name = firstName + " " + lastName;
	this.birthDate = birthDate;
	this.address = address;
}

module.exports = Customer;