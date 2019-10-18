/********************************************************************************************
 *  ShowCustomer.js
 *  
 *  Get customer information.
 *
 *   @input externalCustomerId : String
 *   @output emailAddress : String
 *   @output balance : Number
 *   @output status : String
 *   @output shoppingPreference : String
 *   @output tierName : String
 *   @output tierExpirationDate : String
 *   @output pointsNeededForNextTier : String
 *   @output lastVisitDate : String
 *   @output success : Boolean
 *   @output code : String
 *   @output message : String
 *   @output errorMessage : String
 */
'use strict';

var CustomerShowService = require('../service/CustomerShowService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "ShowCustomer.js");

function execute(args) {
    var responseObject = run(args.externalCustomerId);
    args.emailAddress = responseObject.emailAddress;
    args.balance = responseObject.balance;
    args.status = responseObject.status;
    args.shoppingPreference = responseObject.shoppingPreference;
    args.tierName = responseObject.tierName;
    args.tierExpirationDate = responseObject.tierExpirationDate;
    args.tierJoinDate = responseObject.tierJoinDate;
    args.pointsNeededForNextTier = responseObject.pointsNeededForNextTier;
    args.pointsNeededToKeepCurrentTier = responseObject.pointsNeededToKeepCurrentTier;
    args.lastVisitDate = responseObject.lastVisitDate;
    args.success = responseObject.success;
    args.code = responseObject.code;
    args.message = responseObject.message;
    args.errorMessage = responseObject.errorMessage;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'externalCustomerId':externalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var include = "detail, coupons, member_attributes, points_expiration_schedule, purchase_stats, tier_stats";
        var result = CustomerShowService.run(externalCustomerId, include);
        if (result.object) {
        	var data = result.object.data;
            responseObject = {success : result.object.success,
                              emailAddress : data.email,
                              balance : data.balance,
                              status : data.status,
                              shoppingPreference : data.member_attributes? data.member_attributes.shopping_preference : null,
                              tierName : data.top_tier_name,
                              tierExpirationDate : data.top_tier_expiration_date,
                              tierJoinDate : data.top_tier_join_date,
                              pointsNeededForNextTier : data.actions_needed_for_next_tier,
                              pointsNeededToKeepCurrentTier : data.actions_needed_to_keep_tier,
                              lastVisitDate : data.last_visit_date,
                              code : data.code,
                              message : data.message,
                              errorMessage : result.errorMessage};
        } else {
            responseObject = {success : false,
                              errorMessage : result.errorMessage}
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        responseObject = {success : false,
        		          errorMessage : errMessage};
    }
    logger.debug("responseObject: " + JSON.stringify(responseObject));
    return responseObject;
}

module.exports = {
    'execute': execute,
    'run': run
}