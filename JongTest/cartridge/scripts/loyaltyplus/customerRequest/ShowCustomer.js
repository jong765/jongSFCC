/********************************************************************************************
 *  ShowCustomer.js
 *  
 *  Get customer information.
 *
 *   @input externalCustomerId : String
 *   @input include : String
 *      Possible values:
 *          badges
 *          coupons
 *          detail
 *          member_attributes
 *          punchcards
 *      	purchase_stats
 *			reward_stats
 *			rewards
 *			reward_groups
 *			offers
 *			redemption_limits
 *			tier_stats
 *			referrals
 *			identities
 *			points_expiration_schedule
 *      Note: To include more than one of these, use a comma-separated list, for
 *            example: detail,coupons,reward_stats
 *   @output success : Boolean
 *   @output data : String
 *   @output errorMessage : String
 */
'use strict';

var CustomerShowService = require('../service/CustomerShowService');
var LpResponse = require('../model/LpResponse');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "ShowCustomer.js");

function execute(args) {
    var response = run(args.externalCustomerId, args.include);
    args.success = response.success;
    args.data = response.data;
    args.errorMessage = response.errorMessage;
    return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, include) {
    var response = {};
    try {
        var validationResult = Util.validateRequiredParams({'externalCustomerId':externalCustomerId, 'include':include});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = CustomerShowService.run(externalCustomerId, include);
        if (result.object) {
        	response = new LpResponse(result.object.success, result.object.data, result.errorMessage);
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
    'execute': execute,
    'run': run
}