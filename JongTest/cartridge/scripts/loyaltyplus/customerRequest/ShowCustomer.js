/********************************************************************************************
 *  ShowCustomer.js
 *  
 *  Description :   Get customer information.
 *  Author      :	Jong Kim
 *  Date        :   09/12/2019
 *
 *   @input lpExternalCustomerId : String
 *   @output customerFound : Boolean
 *   @output balance : Number
 *   @output status : String
 *   @output lastVisitDate : String
 *   @output success : Boolean
 * 
 *  Modification log:
 * 
 * 
 ********************************************************************************************/
'use strict';

var CustomerShowService = require('../service/CustomerShowService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "ShowCustomer.js");

function execute(args) {
    var result = run(args.lpExternalCustomerId);
    args.customerFound = result.customerFound;
    args.balance = result.balance;
    args.status = result.status;
    args.lastVisitDate = result.lastVisitDate;
    args.success = result.success;
    return result.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId) {
    try {
        var validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var include = "detail";
        var result = CustomerShowService.run(lpExternalCustomerId, include).object;
        var data = result.data;
        if (data) {
            return {success                     :   result.success,
                    customerFound               :   true,
                    balance                     :   data.balance,
                    status                      :   data.status,    
                    lastVisitDate               :   data.last_visit_date
                   }
        } else {
            return {success                     :   result.success,
                    customerFound               :   false
                   }
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        return {success : false};
    }
    return response;
}

module.exports = {
    'execute': execute,
    'run': run
}