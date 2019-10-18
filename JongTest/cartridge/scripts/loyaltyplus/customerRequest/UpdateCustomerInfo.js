/********************************************************************************************
 *  UpdateCustomerInfo.js
 * 
 *  Change external customer id or personal information of a member.
 *
 *   @input externalCustomerId : String
 *   @input newEmailAddress : String
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
 *   @output responseObject : Object
 */

var UpdateCustomerInfoService = require('../service/UpdateCustomerInfoService');
var CustomerInfo = require('../model/CustomerInfo');
var Address = require('../model/Address');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "UpdateCustomerInfo.js");

function execute(args) {
	var responseObject = run(args.externalCustomerId, args.newEmailAddress, args.firstName, args.lastName, args.birthDate, args.shoppingPreference, args.addressLine1, args.addressLine2, args.city, args.postalCode, args.state, args.mobilePhone);
    args.responseObject = responseObject;
    return result.responseObject ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, newEmailAddress, firstName, lastName, birthDate, shoppingPreference, addressLine1, addressLine2, city, postalCode, state, mobilePhone) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'externalCustomerId':externalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var customerInfo = getCustomerInfo(externalCustomerId, newEmailAddress, firstName, lastName, birthDate, shoppingPreference, addressLine1, addressLine2, city, postalCode, state, mobilePhone);
        var result = UpdateCustomerInfoService.run(customerInfo);
        if (result.object) {
        	responseObject = {success : result.object.success,
                              errorMessage : null};
        } else {
        	responseObject = {success : false,
  				  			  errorMessage : null};
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        responseObject = {success : false,
		                  errorMessage : errMessage};
    }
    logger.debug("responseObject: " + JSON.stringify(responseObject));
    return responseObject;
}

function getCustomerInfo(externalCustomerId, newEmailAddress, firstName, lastName, birthDate, shoppingPreference, addressLine1, addressLine2, city, postalCode, state, mobilePhone) {
	var customerInfo = new CustomerInfo();
	customerInfo.setExternalCustomerId(externalCustomerId);
	customerInfo.setNewEmailAddress(newEmailAddress);
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