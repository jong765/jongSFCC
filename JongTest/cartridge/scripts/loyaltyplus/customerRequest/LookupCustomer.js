/********************************************************************************************
 *  LookupCustomer.js
 *  
 *  Description :   Search for customer by email address.
 *  Author      :	Jong Kim
 *  Date        :   09/12/2019
 *
 *   @input emailAddress : String
 *   @output customerFound : Boolean
 *   @output lpExternalCustomerId : String
 *   @output lastVisitDate : String
 *   @output duplicateEmailsFound : Boolean
 *   @output success : Boolean
 * 
 *  Modification log:
 * 
 * 
 ********************************************************************************************/
'use strict';

var CustomerSearchService = require('../service/CustomerSearchService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "LookupCustomer.js");

function execute(args) {
	var result = run(args.emailAddress);
    args.customerFound = result.customerFound;
    args.lpExternalCustomerId = result.lpExternalCustomerId;
    args.lastVisitDate = result.lastVisitDate;
    args.duplicateEmailsFound = result.duplicateEmailsFound;
    args.success = result.success;
    return result.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress) {
    try {
        var validationResult = Util.validateRequiredParams({'emailAddress':emailAddress});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = CustomerSearchService.run(emailAddress).object;
        if (result.data.length > 1) {
            return {success                 :   false,
                    customerFound           :   false,
                    duplicateEmailsFound    :   true
                   };
        }
        var data = result.data[0];
        if (data) {
            return {success                 :   result.success,
                    customerFound           :   true,
                    lpExternalCustomerId	:	data.external_customer_id,
                    status                  :   data.status,
                    lastVisitDate           :   data.last_visit_date,
                    duplicateEmailsFound    :   false
                   };
        } else {
            return {success                 :   result.success,
                    customerFound           :   false,
                    duplicateEmailsFound    :   false
                   };
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        return {success : false};
    }
}

module.exports = {
    'execute': execute,
    'run': run
}