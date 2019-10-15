/********************************************************************************************
 *  EnrollCustomer.js
 * 
 *  Enroll a customer in the program.
 *
 *   @input emailAddress : String
 *   @input firstName : String
 *   @input lastName : String
 *   @input birthDate : String
 *   @input shoppingPreference : String
 *   @input addressLine1 : String
 *   @input addressLine2 : String
 *   @input city : String
 *   @input postalCode: String
 *   @input state : String
 *   @input mobilePhone : String
 *   @input marketingId : String
 *   @output responseObject : Object
 */
'use strict';

var CustomerEnrollService = require('../service/CustomerEnrollService');
var CustomerInfo = require('../model/CustomerInfo');
var Address = require('../model/Address');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "EnrollCustomer.js");

function execute(args) {
    var responseObject = run(args.emailAddress, args.firstName, args.lastName, args.birthDate, args.shoppingPreference, 
        args.addressLine1, args.addressLine2, args.city, args.postalCode, args.state, args.mobilePhone, args.marketingId);
    args.responseObject = responseObject;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress, firstName, lastName, birthDate, shoppingPreference, 
    addressLine1, addressLine2, city, postalCode, state, mobilePhone, marketingId) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'emailAddress':emailAddress.trim()});
        if (!validationResult.success) {
            return validationResult;
        }
        var customerInfo = getCustomerInfo(emailAddress, firstName, lastName, birthDate, shoppingPreference, 
        	    addressLine1, addressLine2, city, postalCode, state, mobilePhone);
        var result = CustomerEnrollService.run(customerInfo, marketingId).object;
        var data = result.data;
        if (data) {
            responseObject = {success : result.success,
            		          lpExternalCustomerId : data.external_customer_id,
                              errorCode : data.code,
                              errorMessage : data.message};
        } else {
            responseObject = {success : false};
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        responseObject = {success : false};
    }
    logger.debug("responseObject: " + JSON.stringify(responseObject));
    return responseObject;
}

function getCustomerInfo(emailAddress, firstName, lastName, birthDate, shoppingPreference, 
	    addressLine1, addressLine2, city, postalCode, state, mobilePhone) {
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
	return customerInfo;
}

module.exports = {
    'execute': execute,
    'run': run
}