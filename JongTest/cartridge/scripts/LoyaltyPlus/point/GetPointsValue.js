/**
 * GetPointsValue.js
 * 
 *  Get the points value, e.g. points to dollars conversion rate. This is only relevant for accounts who use a
 *   points at checkout reward system.
 *
 *   @output result : Object
 * 
 */

var PointsValueService = require('../service/PointsValueService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "GetPointsValue.js");

function execute(args) {
	var result = run();
    args.result = result;
    return result.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run() {
    var result = null;

    try {
    	result = PointsValueService.run();
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