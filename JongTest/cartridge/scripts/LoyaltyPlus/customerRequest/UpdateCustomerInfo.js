/**
 * UpdateCustomerInfo.js
 * 
 *  Change external customer id or personal information of a member.
 *
 *   @input emailAddress : String
 *   @input extCustomerId : String
 *   @input firstName : String
 *   @input lastName : String
 *   @input address1 : String
 *   @input address2 : String
 *   @input city : String
 *   @input state : String
 *   @input postalCode: String
 *   @input birthDate : String
 *   @input homePhone : String
 *   @input workPhone : String
 *   @input mobilePhone : String
 *   @output result : Object
 * 
 */

var UpdateCustomerInfoService = require('../service/UpdateCustomerInfoService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "UpdateCustomerInfo.js");

function execute(args) {
	var result = run(args.emailAddress, args.extCustomerId, args.firstName, args.lastName, args.address1, args.address2, args.city, args.state, args.postalCode, args.birthDate, args.homePhone, args.workPhone, args.mobilePhone);
    args.result = response;
    return result.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress, extCustomerId, firstName, lastName, address1, address2, city, state, postalCode, birthDate, homePhone, workPhone, mobilePhone) {
    var result = null;
    
    try {
    	result = UpdateCustomerInfoService.run(emailAddress, extCustomerId, firstName, lastName, address1, address2, city, state, postalCode, birthDate, homePhone, workPhone, mobilePhone);
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