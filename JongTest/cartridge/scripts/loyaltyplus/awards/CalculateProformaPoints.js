/********************************************************************************************
 * CalculateProformaPoints.js
 * 
 *  Description :   Calculate the number of points a customer could earn from a purchase.
 *  Author      :	Jong Kim
 *  Date        :   09/11/2019
 *
 *   @input amount : Number
 *   @output result : Object
 * 
 *  Modification log:
 * 
 * 
 ********************************************************************************************/

var PointsShowService = require('../service/PointsShowService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "CalculateProformaPoints.js");

function execute(args) {
	var result = run(args.amount);
	args.result = result;
    return result.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(amount) {
    try {
        var validationResult = Util.validateRequiredParams({'amount':amount});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = PointsShowService.run('purchase', amount).object;
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