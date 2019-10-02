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
 *   @input preferredStore : String
 *   @input addressLine1 : String
 *   @input addressLine2 : String
 *   @input city : String
 *   @input postalCode: String
 *   @input state : String
 *   @input mobilePhone : String
 *   @output responseObject : Object
 */
'use strict';

var CustomerEnrollService = require('../service/CustomerEnrollService-POST');
var Address = require('../model/Address');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "EnrollCustomer-POST.js");

function execute(args) {
    var responseObject = run(args.emailAddress, args.firstName, args.lastName, args.birthDate, args.shoppingPreference, 
        args.preferredStore,args.addressLine1, args.addressLine2, args.city, args.postalCode, args.state, args.mobilePhone);
    args.responseObject = responseObject;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress, firstName, lastName, birthDate, shoppingPreference, 
    preferredStore, addressLine1, addressLine2, city, postalCode, state, mobilePhone) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'emailAddress':emailAddress});
        if (!validationResult.success) {
            return validationResult;
        }
        var address = new Address(addressLine1, addressLine2, city, postalCode, state, null);
        var result = CustomerEnrollService.run(emailAddress, firstName, lastName, birthDate, shoppingPreference, 
            preferredStore, address, mobilePhone).object;
        var data = result.data;
        if (data) {
            responseObject = {success : result.success,
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

module.exports = {
    'execute': execute,
    'run': run
}