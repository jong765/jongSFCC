/**
 *  GetCustomerPointRuleGroups.js
 * 
 *  Get the full detail of all point rules available to the customer, grouped by the point rule group.
 *
 *   @input externalCustomerId : String
 *   @output success : Boolean
 *   @output data : Object
 *   @output errorMessage : String
 */

var CustomerPointRuleGroupsService = require('../service/CustomerPointRuleGroupsService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "GetCustomerPointRuleGroups.js");

function execute(args) {
	var response = run(args.externalCustomerId);
	args.success = response.success;
	args.data = response.data;
	args.errorMessage = response.errorMessage;
    return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId) {
    var response = {};
    try {
        var validationResult = Util.validateRequiredParams({'externalCustomerId':externalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = CustomerPointRuleGroupsService.run(externalCustomerId).object;
        var data = result.data;
        if (data) {
            response = {success : result.success,
                        data : data,
                        errorMessage : result.errorMessage};
        } else {
            response = {success : false,
            		    data : null,
            		    errorMessage : result.errorMessage};
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        response = {success : false,
        		    data : null,
        		    errorMessage : errMessage};
    }
    logger.debug("response: " + JSON.stringify(response));
    return response;
}

module.exports = {
    'execute': execute,
    'run': run
}