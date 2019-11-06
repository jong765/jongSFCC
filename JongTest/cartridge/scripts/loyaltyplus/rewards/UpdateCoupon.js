/********************************************************************************************
 *  UpdateCoupon.js
 * 
 *  Update status of a coupon code.
 *
 *   @input code : String
 *   @input status : String
 *   @output responseObject : Object
 */

var CouponUpdateService = require('../service/CouponUpdateService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "UpdateCoupon.js");

function execute(args) {
	var responseObject = run(args.code, args.status);
	args.responseObject = responseObject;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(code, status) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'code':code, 'status':status});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = CouponUpdateService.run(code, status).object;
        var coupons = result.data;
        if (coupons) {
            responseObject = {success : result.success};
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