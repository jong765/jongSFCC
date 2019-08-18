/**
 * EnrollCustomer.js
 * 
 *  Enroll a customer in a LoyaltyPlus program.
 *
 *   @input emailAddress : String
 *   @input firstName : String
 *   @input lastName : String
 *   @input gender : String
 *   @input address : String
 *   @input city : String
 *   @input zip : String
 *   @input birthdate : Date
 *	 @input isMobileApp : Boolean
 *   @input phone : String
 *	 @input state : String
 *   @output lpCustomerID : String
 *   @output lastCheckin : String
 * 
 */

var ApiService = require('../service/ApiService');
var Address = require('../model/Address');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "EnrollCustomer.js");

function execute(args) {
	var enrollResponse = enroll(args);
    args.lpCustomerID = enrollResponse.lpCustomerID;
    args.lastCheckin = enrollResponse.lastCheckin;
    return enrollResponse.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function enroll(args) {
    var enrollResponse = {
    	success 		: 	false,
    	lpCustomerID 	: 	null,
    	lastCheckin 	:	null
    };

    try {
    	var result = ApiService.enroll(args.emailAddress, customerId, args.firstName, args.lastName, address, birthDate);
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