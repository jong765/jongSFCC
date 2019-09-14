/********************************************************************************************
 * UpdateCustomerInfo.js
 * 
 *  Description :   Change external customer id or personal information of a member.
 *  Author      :	Jong Kim
 *  Date        :   09/12/2019
 *
 *   @input lpExternalCustomerId : String
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

var UpdateCustomerInfoService = require('../service/UpdateCustomerInfoService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "UpdateCustomerInfo.js");

function execute(args) {
	var result = run(args.lpExternalCustomerId, args.firstName, args.lastName, args.shoppingPreference, args.addressLine1, args.city, args.postalCode, args.birthDate, args.mobilePhone, args.state);
    args.result = result;
    return result.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId, firstName, lastName, shoppingPreference, addressLine1, city, postalCode, birthDate, mobilePhone, state) {
    try {
        var validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = UpdateCustomerInfoService.run(lpExternalCustomerId, firstName, lastName, shoppingPreference, addressLine1, city, postalCode, birthDate, mobilePhone, state).object;
        return result? {success : result.success} : {success : false};
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