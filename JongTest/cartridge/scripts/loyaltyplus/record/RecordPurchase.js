/********************************************************************************************
 * RecordPurchase.js
 * 
 *  Description :   Record purchase event for the order.
 *  Author      :	Jong Kim
 *  Date        :   09/12/2019
 *
 *   @input lpExternalCustomerId : String
 *   @input emailAddress : String
 *   @input order : dw.order.Order
 *   @output result : Object
 * 
 *  Modification log:
 * 
 * 
 ********************************************************************************************/

var RecordService = require('../service/RecordService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "RecordPurchase.js");

function execute(args) {
	var result = run(args.lpExternalCustomerId, args.emailAddress, args.order);
	args.result = result;
    return result.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId, emailAddress, order) {
    try {
        var validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId, 'emailAddress':emailAddress, 'order':order});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = RecordService.run(lpExternalCustomerId, emailAddress, 'purchase', value, order.orderNo).object;
        if (result) {
            return {success   :   result.success,
                    points    :   result.points
                   }
        } else {
            return {success     :   false
                   }
        }
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