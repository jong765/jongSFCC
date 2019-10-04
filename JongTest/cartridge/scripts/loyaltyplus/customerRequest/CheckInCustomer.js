/********************************************************************************************
 *  CheckInCustomer.js
 * 
 *  Take care of processes when customer checks in.
 *
 *   @input lpExternalCustomerId : String
 *   @output responseObject : Object
 */

var UpdateCustomerInfoService = require('../service/UpdateCustomerInfoService');
var CustomerInfo = require('../model/CustomerInfo');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "CheckInCustomer.js");

function execute(args) {
	var responseObject = run(args.lpExternalCustomerId);
    args.responseObject = responseObject;
    return result.responseObject ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = updateLastVisitDate(lpExternalCustomerId);
        if (result.success) {
        	
        } else {
        	return {success : false};
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

function updateLastVisitDate(lpExternalCustomerId) {
	var customerInfo = new CustomerInfo();
    customerInfo.externalCustomerId = lpExternalCustomerId;
    customerInfo.lastVisitDate = Util.getCurrentDate("yyyy-MM-dd'T'HH:MM:ss-HH:MM");
    var result = UpdateCustomerInfoService.run(customerInfo).object;
    responseObject  = result? {success : result.success} : {success : false};
    return responseObject;
}

module.exports = {
    'execute': execute,
    'run': run
}