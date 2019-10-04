/********************************************************************************************
 *  UpdateCustomerInfo.js
 * 
 *  Change external customer id or personal information of a member.
 *
 *   @input lpExternalCustomerId : String
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
	var responseObject = run(args.lpExternalCustomerId, args.newEmailAddress, args.firstName, args.lastName, args.birthDate, args.shoppingPreference, args.addressLine1, args.addressLine2, args.city, args.postalCode, args.state, args.mobilePhone);
    args.responseObject = responseObject;
    return result.responseObject ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId, newEmailAddress, firstName, lastName, birthDate, shoppingPreference, addressLine1, addressLine2, city, postalCode, state, mobilePhone) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var customerInfo = getCustomerInfo(lpExternalCustomerId, newEmailAddress, firstName, lastName, birthDate, shoppingPreference, addressLine1, addressLine2, city, postalCode, state, mobilePhone);
        var result = UpdateCustomerInfoService.run(customerInfo).object;
        responseObject  = result? {success : result.success} : {success : false};
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        responseObject = {success : false};
    }
    logger.debug("responseObject: " + JSON.stringify(responseObject));
    return responseObject;
}

function getCustomerInfo(lpExternalCustomerId, newEmailAddress, firstName, lastName, birthDate, shoppingPreference, addressLine1, addressLine2, city, postalCode, state, mobilePhone) {
	var customerInfo = new CustomerInfo();
	customerInfo.externalCustomerId = lpExternalCustomerId;
	customerInfo.newEmailAddress = newEmailAddress;
	customerInfo.firstName = firstName;
	customerInfo.lastName = lastName;
	customerInfo.birthDate = birthDate;
	customerInfo.shoppingPreference = shoppingPreference;
	customerInfo.mobilePhone = mobilePhone;
	var address = new Address();
	address.addressLine1 = addressLine1;
	address.addressLine2 = addressLine2;
	address.city = city;
	address.postalCode = postalCode;
	address.state = state;
	customerInfo.address = address;
	return customerInfo;
}

module.exports = {
    'execute': execute,
    'run': run
}