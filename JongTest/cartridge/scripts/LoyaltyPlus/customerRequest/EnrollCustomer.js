/**
 * EnrollCustomer.js
 * 
 *  Enroll a customer in the program.
 *
 *   @input emailAddress : String
 *   @input firstName : String
 *   @input lastName : String
 *   @input postalCode: String
 *   @input birthDate : String
 *   @input homePhone : String
 *   @input workPhone : String
 *   @input mobilePhone : String
 *   @input page : Number
 *   @output result : Object
 * 
 */

var CustomerEnrollService = require('../service/CustomerEnrollService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "EnrollCustomer.js");

function execute(args) {
	var result = run(args.emailAddress, args.firstName, args.lastName, args.postalCode, args.birthDate, args.homePhone, args.workPhone, args.mobilePhone);
    args.result = response;
    return result.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress, firstName, lastName, postalCode, birthDate, homePhone, workPhone, mobilePhone) {
    var result = null;
    
    try {
    	result = CustomerEnrollService.run(emailAddress, firstName, lastName, postalCode, birthDate, homePhone, workPhone, mobilePhone);
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return result;
}

module.exports = {
    'execute': execute,
    'run': run
}