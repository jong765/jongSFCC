/********************************************************************************************
 *  EnrollCustomer.js
 * 
 *  Enroll a customer in the program.
 *
 *   @input emailAddress : String
 *   @input firstName : String
 *   @input lastName : String
 *   @input birthDate : String  (mm-dd or mmdd format only)
 *   @input shoppingPreference : String
 *   @input addressLine1 : String
 *   @input addressLine2 : String
 *   @input city : String
 *   @input postalCode: String
 *   @input state : String
 *   @input mobilePhone : String
 *   @input marketingId : String
 *   @input acceptedTermsConditions : Boolean
 *   @output success : String
 *   @output data : Object
 *   @output errorMessage: String
 */
'use strict';

var CustomerEnrollService = require('../helper/service/CustomerEnrollService');
var CustomerInfo = require('../helper/model/CustomerInfo');
var Address = require('../helper/model/Address');
var LpResponse = require('../helper/model/LpResponse');
var Util = require('../helper/util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "EnrollCustomer.js");

function execute(args) {
    var response = run(args.emailAddress, args.firstName, args.lastName, args.birthDate, args.shoppingPreference, 
        args.addressLine1, args.addressLine2, args.city, args.postalCode, args.state, args.mobilePhone, args.marketingId,
        args.acceptedTermsConditions);
    args.success = response.success;
    args.data = response.data;
    args.errorMessage = response.errorMessage;
    return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress, firstName, lastName, birthDate, shoppingPreference, 
    addressLine1, addressLine2, city, postalCode, state, mobilePhone, marketingId, 
    acceptedTermsConditions) {
    var response = {};
    try {
        var validationResult = Util.validateRequiredParams({'emailAddress':emailAddress.trim()});
        if (!validationResult.success) {
            return validationResult;
        }
        var customerInfo = getCustomerInfo(emailAddress, firstName, lastName, birthDate, shoppingPreference, 
        	    addressLine1, addressLine2, city, postalCode, state, mobilePhone, acceptedTermsConditions);
        var result = CustomerEnrollService.run(customerInfo, marketingId);
        if (result.object) {
        	response = new LpResponse(result.object.success, result.object.data, result.errorMessage);
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

function getCustomerInfo(emailAddress, firstName, lastName, birthDate, shoppingPreference, 
	    addressLine1, addressLine2, city, postalCode, state, mobilePhone, acceptedTermsConditions) {
	var customerInfo = new CustomerInfo();
	customerInfo.setEmailAddress(emailAddress);
	customerInfo.setFirstName(firstName);
	customerInfo.setLastName(lastName);
	customerInfo.setBirthDate(birthDate);
	customerInfo.setShoppingPreference(shoppingPreference);
	if (!empty(addressLine1) || !empty(city) || !empty(state) || !empty(postalCode)) {
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
	return customerInfo;
}

module.exports = {
    'execute': execute,
    'run': run
}