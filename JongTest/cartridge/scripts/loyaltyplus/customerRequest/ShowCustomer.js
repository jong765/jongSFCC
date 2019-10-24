/********************************************************************************************
 *  ShowCustomer.js
 *  
 *  Get customer information.
 *
 *   @input externalCustomerId : String
 *   @output success : Boolean
 *   @output emailAddress : String
 *   @output name : String
 *   @output firstName : String
 *   @output lastName : String
 *   @output addressLine1 : String
 *   @output addressLine2 : String
 *   @output balance : Number
 *   @output status : String
 *   @output shoppingPreference : String
 *   @output tierName : String
 *   @output tierExpirationDate : String
 *   @output pointsNeededForNextTier : String
 *   @output code : String
 *   @output message : String
 *   @output errorMessage : String
 */
'use strict';

var CustomerShowService = require('../service/CustomerShowService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "ShowCustomer.js");

function execute(args) {
    var response = run(args.externalCustomerId);
    args.success = response.success;
    args.emailAddress = response.emailAddress;
    args.name = response.name;
    args.firstName = response.firstName;
    args.lastName = response.lastName;
    args.addressLine1 = response.addressLine1;
    args.addressLine2 = response.addressLine2;
    args.balance = response.balance;
    args.status = response.status;
    args.shoppingPreference = response.shoppingPreference;
    args.tierName = response.tierName;
    args.tierExpirationDate = response.tierExpirationDate;
    args.tierJoinDate = response.tierJoinDate;
    args.pointsNeededForNextTier = response.pointsNeededForNextTier;
    args.pointsNeededToKeepCurrentTier = response.pointsNeededToKeepCurrentTier;
    args.code = response.code;
    args.message = response.message;
    args.errorMessage = response.errorMessage;
    return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId) {
    var response = {};
    try {
        var validationResult = Util.validateRequiredParams({'externalCustomerId':externalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var include = "detail, coupons, member_attributes, points_expiration_schedule, purchase_stats, tier_stats";
        var result = CustomerShowService.run(externalCustomerId, include);
        if (result.object) {
        	var data = result.object.data;
            response = {success : result.object.success,
                        emailAddress : data.email,
                        name : data.name,
                        firstName : data.first_name,
                        lastName : data.last_name,
                        addressLine1 : data.address_line_1,
                        addressLine2 : data.address_line_2,
                        balance : data.balance,
                        status : data.status,
                        shoppingPreference : data.member_attributes? data.member_attributes.shopping_preference : null,
                        tierName : data.top_tier_name,
                        tierExpirationDate : data.top_tier_expiration_date,
                        tierJoinDate : data.top_tier_join_date,
                        pointsNeededForNextTier : data.actions_needed_for_next_tier,
                        pointsNeededToKeepCurrentTier : data.actions_needed_to_keep_tier,
                        code : data.code,
                        message : data.message,
                        errorMessage : result.errorMessage};
        } else {
            response = {success : false,
                        errorMessage : result.errorMessage};
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        response = {success : false,
        		    errorMessage : errMessage};
    }
    logger.debug("response: " + JSON.stringify(response));
    return response;
}

module.exports = {
    'execute': execute,
    'run': run
}