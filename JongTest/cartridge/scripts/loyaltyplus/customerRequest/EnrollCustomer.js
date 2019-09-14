/********************************************************************************************
 * EnrollCustomer.js
 * 
 *  Description :   Enroll a customer in the program.
 *  Author      :	Jong Kim
 *  Date        :   09/10/2019
 *
 *   @input emailAddress : String
 *   @input firstName : String
 *   @input lastName : String
 *   @input shoppingPreference : String
 *   @input addressLine1 : String
 *   @input city : String
 *   @input postalCode: String
 *   @input birthDate : String
 *   @input mobilePhone : String
 *   @input state : String
 *   @output result : Object
 * 
 *  Modification log:
 * 
 * 
 ********************************************************************************************/
'use strict';

var CustomerEnrollService = require('../service/CustomerEnrollService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "EnrollCustomer.js");

function execute(args) {
	var result = run(args.emailAddress, args.firstName, args.lastName, args.shoppingPreference, args.addressLine1, args.city, args.postalCode, args.birthDate, args.mobilePhone, args.state);
    args.result = result;
    return result.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress, firstName, lastName, shoppingPreference, addressLine1, city, postalCode, birthDate, mobilePhone, state) {
    try {
        var validationResult = Util.validateRequiredParams({'emailAddress':emailAddress});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = CustomerEnrollService.run(emailAddress, firstName, lastName, shoppingPreference, addressLine1, city, postalCode, birthDate, mobilePhone, state).object;
        var data = result.data;
        if (data) {
            return {success                     :   result.success,
                    errorCode                   :   data.code,
                    errorMessage                :   data.message
                   };
        } else {
            return {success                     :   false
                   };
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        return {success : false};
    }
    return result;
}

module.exports = {
    'execute': execute,
    'run': run
}