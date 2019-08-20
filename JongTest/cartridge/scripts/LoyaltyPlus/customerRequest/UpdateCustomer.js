/**
 * UpdateCustomer.js
 * 
 *  Change external customer id or personal information of a member
 *
 *   @input emailAddress : String
 *   @input extCustomerId : String
 *   @input firstName : String
 *   @input lastName : String
 *   @input birthDate : String
 *   @input address1 : String
 *   @input address2 : String
 *   @input city : Sting
 *   @input state : String
 *   @input postalCode : String
 *   @input country : String
 *   @input homePhone : String
 *   @input workPhone : String
 *   @input mobilePhone : String
 * 
 */

var ApiService = require('../service/CustomerService');
var Address = require('../model/Address');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "UpdateCustomer.js");

function execute(args) {
	var updateCustomerResponse = updateCustomer(args);
    return updateCustomerResponse.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function updateCustomer(args) {
    var updateCustomerResponse = {
    	success 		: 	false
    };

    try {
    	var address = new Address(address1, address2, city, state, postalCode, country, homePhone, workPhone, mobilePhone);
    	var result = CustomerService.updateCustomerInfo(args.emailAddress, args.extCustomerId, firstName, lastName, birthDate, address);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return updateCustomerResponse;
}

module.exports = {
    'execute': execute,
    'updateCustomer': updateCustomer
}