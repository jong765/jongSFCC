/*******************************************************************************
 * UpdateCoupon.js
 * 
 * Update status of a coupon code.
 * 
 * @input code : String
 * @input status : String
 * @output success : Boolean
 * @output data : Object
 * @output errorMessage : String
 */

var CouponUpdateService = require('../helper/service/CouponUpdateService');
var LpResponse = require('../helper/model/LpResponse');
var Util = require('../helper/util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "UpdateCoupon.js");

function execute(args) {
	var response = run(args.code, args.status);
	args.success = response.success;
	args.data = response.data;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(code, status) {
	var response = {};
	try {
		var validationResult = Util.validateRequiredParams({
			'code' : code,
			'status' : status
		});
		if (!validationResult.success) {
			return validationResult;
		}
		var result = CouponUpdateService.run(code, status);
		if (result.object) {
			response = new LpResponse(result.object.success, result.object.data,
					result.errorMessage)
		} else {
			response = new LpResponse(false, null, result.errorMessage);
		}
	} catch (e) {
		var exception = e;
		var errMessage = exception.message + "\n" + exception.stack;
		logger.error(errMessage);
		response = new LpResponse(false, null, errMessage);
	}
	logger.debug("response: " + JSON.stringify(response));
	return response;
}

module.exports = {
	'execute' : execute,
	'run' : run
}