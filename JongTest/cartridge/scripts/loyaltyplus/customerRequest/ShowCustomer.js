/********************************************************************************************
 *  ShowCustomer.js
 *  
 *  Get customer information.
 *
 *   @input lpExternalCustomerId : String
 *   @output customerFound : Boolean
 *   @output emailAddress : String
 *   @output balance : Number
 *   @output status : String
 *   @output topTierName : String
 *   @output shoppingPreference : String
 *   @output actionsNeededForNextTier : String
 *   @output lastVisitDate : String
 *   @output success : Boolean
 */
'use strict';

var CustomerShowService = require('../service/CustomerShowService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "ShowCustomer.js");

function execute(args) {
    var responseObject = run(args.lpExternalCustomerId);
    args.customerFound = responseObject.customerFound;
    args.emailAddress = responseObject.emailAddress;
    args.balance = responseObject.balance;
    args.status = responseObject.status;
    args.topTierName = responseObject.topTierName;
    args.shoppingPreference = responseObject.shoppingPreference;
    args.actionsNeededForNextTier = responseObject.actionsNeededForNextTier;
    args.lastVisitDate = responseObject.lastVisitDate;
    args.success = responseObject.success;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var include = "detail,member_attributes,tier_stats";
        var result = CustomerShowService.run(lpExternalCustomerId, include).object;
        var data = result.data;
        if (data) {
            responseObject = {success : result.success,
                              customerFound : true,
                              emailAddress : data.email,
                              balance : data.balance,
                              status : data.status,
                              topTierName : data.top_tier_name,
                              shoppingPreference : data.member_attributes.shopping_preference,
                              actionsNeededForNextTier : data.actions_needed_for_next_tier,
                              lastVisitDate : data.last_visit_date};
        } else {
            responseObject = {success : result.success,
                              customerFound : false}
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