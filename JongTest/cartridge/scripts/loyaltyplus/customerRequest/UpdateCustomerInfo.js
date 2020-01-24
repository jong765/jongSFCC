/*******************************************************************************
 * UpdateCustomerInfo.js
 * 
 * Update the customer details of a customer. Either externalCustomerId or
 * emailAddress is required.
 * 
 * @input externalCustomerId : String
 * @input emailAddress : String
 * @input firstName : String
 * @input lastName : String
 * @input birthDate : String
 * @input addressLine1 : String
 * @input addressLine2 : String
 * @input city : String
 * @input state : String
 * @input postalCode: String
 * @input mobilePhone : String
 * @input shoppingPreference : String
 * @input acceptedTermsConditions : Boolean
 * @input newEmailAddress : String If present (not null), change email address
 *        of the customer.
 * @output success : Boolean
 * @output data : Object
 * @output errorMessage : String
 */

var UpdateCustomerInfoService = require('../helper/service/UpdateCustomerInfoService');
var CustomerInfo = require('../helper/model/CustomerInfo');
var Address = require('../helper/model/Address');
var LpResponse = require('../helper/model/LpResponse');
var Util = require('../helper/util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error",
		"UpdateCustomerInfo.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.emailAddress,
			args.firstName, args.lastName, args.birthDate, args.addressLine1,
			args.addressLine2, args.city, args.state, args.postalCode,
			args.mobilePhone, args.shoppingPreference,
			args.acceptedTermsConditions, args.newEmailAddress);
	args.success = response.success;
	args.data = response.data;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, emailAddress, firstName, lastName, birthDate,
		addressLine1, addressLine2, city, state, postalCode, mobilePhone,
		shoppingPreference, acceptedTermsConditions, newEmailAddress) {
	var response = {};
	var validationResult = {};
	try {
		validationResult.success = !empty(externalCustomerId)
				|| !empty(emailAddress);
		if (!validationResult.success) {
			validationResult.errorMessage = "Either externalCustomerId or emailAddress is required.";
			return validationResult;
		}
		var customerInfo = getCustomerInfo(externalCustomerId, emailAddress,
				newEmailAddress, firstName, lastName, birthDate,
				shoppingPreference, addressLine1, addressLine2, city, state,
				postalCode, mobilePhone, acceptedTermsConditions,
				newEmailAddress);
		var result = UpdateCustomerInfoService.run(customerInfo);
		if (result.object) {
			response = new LpResponse(result.object.success, result.object.data, null);
		} else {
			response = new LpResponse(false, null, result.errorMessage);
		}
	} catch (e) {
		var exception = e;
		var errMessage = exception.message + "\n" + exception.stack;
		logger.error(errMessage);
		response = new LpResponse(false, null, errMessage);
	}
	logger.debug("response: " + JSON.stringify(response));
	return response;
}

function getCustomerInfo(externalCustomerId, emailAddress, newEmailAddress,
		firstName, lastName, birthDate, shoppingPreference, addressLine1,
		addressLine2, city, state, postalCode, mobilePhone,
		acceptedTermsConditions, newEmailAddress) {
	var customerInfo = new CustomerInfo();
	customerInfo.setExternalCustomerId(externalCustomerId);
	customerInfo.setEmailAddress(emailAddress);
	customerInfo.setFirstName(firstName);
	customerInfo.setLastName(lastName);
	customerInfo.setBirthDate(birthDate);
	customerInfo.setShoppingPreference(shoppingPreference);
	if (!empty(addressLine1) || !empty(city) || !empty(state)
			|| !empty(postalCode)) {
		var address = new Address();
		address.setAddressLine1(addressLine1);
		address.setAddressLine2(addressLine2);
		address.setCity(city);
		address.setPostalCode(postalCode);
		address.setState(state);
		customerInfo.setAddress(address);
	}
	customerInfo.setMobilePhone(mobilePhone);
	customerInfo.setAcceptedTermsConditions(acceptedTermsConditions);
	customerInfo.setNewEmailAddress(newEmailAddress);
	return customerInfo;
}

module.exports = {
	'execute' : execute,
	'run' : run
}