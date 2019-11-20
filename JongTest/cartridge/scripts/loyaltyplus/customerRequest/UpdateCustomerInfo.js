/********************************************************************************************
 *  UpdateCustomerInfo.js
 * 
 *  Update the customer details of a customer.
 *
 *   @input externalCustomerId : String
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
 *   @input acceptedTermsConditions : Boolean
 *   @input newEmailAddress : String
 *      If present (not null), change email address of the customer.
 *   @output success : Boolean
 *   @output data : Object
 *   @output errorMessage : String
 */

var UpdateCustomerInfoService = require('../helper/service/UpdateCustomerInfoService');
var CustomerInfo = require('../helper/model/CustomerInfo');
var Address = require('../helper/model/Address');
var LpResponse = require('../helper/model/LpResponse');
var Util = require('../helper/util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "UpdateCustomerInfo.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.firstName, args.lastName, args.birthDate, args.shoppingPreference, args.addressLine1, args.addressLine2, 
			args.city, args.postalCode, args.state, args.mobilePhone, args.acceptedTermsConditions, args.newEmailAddress);
    args.success = response.success;
    args.data = response.data;
    args.errorMessage = response.errorMessage;
    return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, firstName, lastName, birthDate, shoppingPreference, addressLine1, addressLine2, city, postalCode, 
		state, mobilePhone, acceptedTermsConditions, newEmailAddress) {
    var response = {};
    try {
        var validationResult = Util.validateRequiredParams({'externalCustomerId':externalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var customerInfo = getCustomerInfo(externalCustomerId, newEmailAddress, firstName, lastName, birthDate, shoppingPreference, 
        		addressLine1, addressLine2, city, postalCode, state, mobilePhone, acceptedTermsConditions, newEmailAddress);
        var result = UpdateCustomerInfoService.run(customerInfo);
        if (result.object) {
        	response = new LpResponse(result.object.success, null, null);
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

function getCustomerInfo(externalCustomerId, newEmailAddress, firstName, lastName, birthDate, shoppingPreference, addressLine1, 
		addressLine2, city, postalCode, state, mobilePhone, acceptedTermsConditions, newEmailAddress) {
	var customerInfo = new CustomerInfo();
	customerInfo.setExternalCustomerId(externalCustomerId);
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
	customerInfo.setNewEmailAddress(newEmailAddress);
	return customerInfo;
}

module.exports = {
    'execute': execute,
    'run': run
}