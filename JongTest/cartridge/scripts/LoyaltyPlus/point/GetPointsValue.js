/**
 * GetPointsValue.js
 * 
 *  Get the points value, e.g. points to dollars conversion rate. This is only relevant for accounts who use a
 *   points at checkout reward system.
 *
 *   @output response : Object
 * 
 */

var PointService = require('../service/PointService');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger("loyaltyplus-error", "GetPointsValue.js");

function execute(args) {
	var response = run();
    args.response = response;
    return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run() {
    var response = null;

    try {
    	response = PointService.pointsValue();
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
    }
    return response;
}

module.exports = {
    'execute': execute,
    'run': run
}