/*******************************************************************************
* GetUsedAwardAmount.js
* 
* Calculate total used award amount for the last xx days
*
*   @input externalCustomerId : String
*   @input numberOfDays : Number
*   @output success : Boolean
*   @output usedAwardAmount : Number
*   @output errorMessage : String
*/

'use strict';

var Calendar = require('dw/util/Calendar');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "GetUsedAwardAmount.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.numberOfDays);
	args.success = response.success;
	args.usedAwardAmount = response.data.usedAwardAmount;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, numberOfDays) {
	var LpResponse = require('../helper/model/LpResponse');
	var response = {};
	var status = "used";
    try {
    	var result = require('../rewards/GetCustomerCoupons').run(externalCustomerId, null, "used");
    	if (result.success) {
    		var usedAwardAmount = calculateUsedAwardAmount(result.coupons, numberOfDays);
    		response = new LpResponse(result.success, {usedAwardAmount:usedAwardAmount}, result.errorMessage);
		} else {
			response = new LpResponse(false, null, result.errorMessage);
		}
    } catch(e) {
    	var exception = e;
		var errMessage = exception.message + "\n" + exception.stack;
		logger.error(errMessage);
		response = new LpResponse(false, null, errMessage);
    }

    return response;

};

function calculateUsedAwardAmount(coupons, numberOfDays) {
	var DateUtil = require('../helper/util/DateUtil');
	var lastNDate = DateUtil.addDays(new Date(), numberOfDays * -1);
    var amountTotal = 0.00;
    for (var i = 0; i < coupons.length; i++){
       if (DateUtil.getDifferenceInDays(coupons[i].usedAt, lastNDate) <= 30){
            amountTotal += coupons[i].amount;
        }
    }
    return amountTotal;
}

module.exports = {
    execute: execute,
    run: run
}