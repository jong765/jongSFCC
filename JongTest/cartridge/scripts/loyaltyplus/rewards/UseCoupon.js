/********************************************************************************************
 *  UseCoupon.js
 * 
 *  Update status of a coupon as used.
 *
 *   @input code : String
 *   @output success : Boolean
 *   @output data : Object
 *   @output errorMessage : String
 */

var CouponUpdateService = require('../service/CouponUpdateService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "UpdateCoupon.js");

function execute(args) {
	var response = run(args.code);
	args.success = response.success;
	args.data = response.data;
	args.errorMessage = response.errorMessage;
    return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(code) {
    var response = {};
    try {
        var validationResult = Util.validateRequiredParams({'code':code});
        if (!validationResult.success) {
            return validationResult;
        }
        var status = "used";
        var result = CouponUpdateService.run(code, status);
        if (result.object) {
        	response = {success : result.object.success,
				    	data : result.object.data,
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