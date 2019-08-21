/**
 * EnrollCustomer.js
 * 
 *  Enroll a customer in a LoyaltyPlus program.
 *
 *   @input emailAddress : String
 *   @input extCustomerId : String
 *   @input firstName : String
 *   @input lastName : String
 *   @input address1 : String
 *   @input address2 : String
 *   @input city : String
 *   @input postalCode : String
 *   @input country : String
 *   @input birthDate : Date
 *   @input phone : String
 *	 @input state : String
 *   @output lpCustomerId : String
 *   @output lastCheckin : String
 * 
 */

var ApiService = require('../service/ApiService');
var Customer = require('../model/Customer');
var Address = require('../model/Address');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "EnrollCustomer.js");

function execute(args) {
	var enrollResponse = enroll(args);
    args.lpCustomerId = enrollResponse.lpCustomerId;
    args.lastCheckin = enrollResponse.lastCheckin;
    return enrollResponse.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function enroll(args) {
    var enrollResponse = {
    	success 		: 	false,
    	lpCustomerId 	: 	null,
    	lastCheckin 	:	null
    };

    try {
    	var address = new Address(args.address1, args.address2, args.city, args.state, args.postalCode, args.country, args.homePhone, args.workPhone, args.mobilePhone);
    	var customer = new Customer(args.emailAddress, args.extCustomerId, args.firstName, args.lastName, args.birthDate, address);
    	var result = ApiService.enroll(customer);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return enrollResponse;
}

module.exports = {
    'execute': execute,
    'enroll': enroll
}