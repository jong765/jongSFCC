/********************************************************************************************
 * GetCustomerEvents.js
 * 
 *  Description :   Get history of point earning events completed by a customer.
 *  Author      :	Jong Kim
 *  Date        :   09/09/2019
 *
 *   @input emailAddress : String
 *   @input pageNumber : Number
 *   @input entriesPerPage : Number
 *   @output result : Object
 * 
 *  Modification log:
 * 
 * 
 ********************************************************************************************/

var CustomerEventsService = require('../service/CustomerEventsService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "GetCustomerEvents.js");

function execute(args) {
	var result = run(args.emailAddress, args.pageNumber, args.entriesPerPage);
	args.result = result;
    return result.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress, pageNumber, entriesPerPage) {
    try {
        var validationResult = Util.validateRequiredParams({'emailAddress':emailAddress});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = CustomerEventsService.run(emailAddress, pageNumber, entriesPerPage).object;
        var data = result.data;
        if (data) {
            return {success     :   result.success,
                    data        :   data
                   };
        } else {
            return {success     :   false
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