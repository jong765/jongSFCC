/********************************************************************************************
 *  CalculateProformaPoints.js
 * 
 *  Calculate the number of points a customer could earn from a purchase.
 * 
 *   @input amount : Number
 *   @output responseObject : Object
 */

var PointsShowService = require('../service/PointsShowService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "CalculateProformaPoints.js");

function execute(args) {
	var responseObject = run(args.amount);
	args.responseObject = responseObject;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(amount) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'amount':amount});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = PointsShowService.run('purchase', amount).object;
        if (result) {
            responseObject = {success : result.success,
                              points : result.points};
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