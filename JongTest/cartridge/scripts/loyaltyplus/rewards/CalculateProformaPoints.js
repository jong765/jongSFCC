/*******************************************************************************
 * CalculateProformaPoints.js
 * 
 * Calculate the number of points a customer could earn from a purchase.
 * 
 * @input lineItemCtnr : dw.order.LineItemCtnr
 * @output success : Boolean
 * @output points : Number
 * @output errorMessage : String
 */

var logger = require('dw/system/Logger').getLogger("loyaltyplus-error",
		"CalculateProformaPoints.js");

function execute(args) {
	var response = run(args.lineItemCtnr);
	args.success = response.success;
	args.points = response.points;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lineItemCtnr) {
	var LpCalculateProformaPointsResponse = require('../helper/model/LpCalculateProformaPointsResponse');
	var response = {};
	try {
		var validationResult = require('../helper/util/Util').validateRequiredParams({
			'lineItemCtnr' : lineItemCtnr
		});
		if (!validationResult.success) {
			return validationResult;
		}
		var result = require('../helper/service/PointsShowService').run('purchase', lineItemCtnr);
		if (result.object) {
			response = new LpCalculateProformaPointsResponse(result.object, result.errorMessage);
		} else {
			response = new LpCalculateProformaPointsResponse(false, null, result.errorMessage);
		}
	} catch (e) {
		var exception = e;
		var errMessage = exception.message + "\n" + exception.stack;
		logger.error(errMessage);
		response = new LpCalculateProformaPointsResponse(false, null, errMessage);
	}
	logger.debug("response: " + JSON.stringify(response));
	return response;
}

module.exports = {
	'execute' : execute,
	'run' : run
}