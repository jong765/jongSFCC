/**
 *  GetCustomerEvents.js
 * 
 *  Get history of point earning events completed by a customer.
 *
 *   @input lpExtCustomerId : String
 *   @input eventType : String
 *   @input pageNumber : Number
 *   @input entriesPerPage : Number
 *   @output responseObject : Object
 */

var CustomerEventsService = require('../service/CustomerEventsService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "GetCustomerEvents.js");

function execute(args) {
	var responseObject = run(args.lpExtCustomerId, args.eventType, args.dateFilter, args.afterDate, args.pageNumber, args.entriesPerPage);
	args.responseObject = responseObject;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExtCustomerId, eventType, dateFilter, afterDate, pageNumber, entriesPerPage) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'lpExtCustomerId':lpExtCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = CustomerEventsService.run(lpExtCustomerId, eventType, dateFilter, afterDate, pageNumber, entriesPerPage).object;
        var data = result.data;
        if (data) {
            responseObject = {success : result.success,
                              data : data};
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