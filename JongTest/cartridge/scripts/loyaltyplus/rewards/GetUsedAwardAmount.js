/*******************************************************************************
* GetUsedAwardAmount.js
* 
* Calculate total used award amount for the last xx days
*
*   @input externalCustomerId : String
*   @input numberOfDays : Number
*   @output success : Boolean
*   @output usedAwardAmount : Object
*   @output errorMessage : String
*/

'use strict';

var Calendar = require('dw/util/Calendar');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "GetUsedAwardAmount.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.numberOfDays);
	args.success = response.success;
	args.usedAwardAmount = response.usedAwardAmount;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, numberOfDays) {

    var redeemedAwardAmount = {};
    var awardActivity = [];

    try {
        redeemedAwardAmount.value = calculateUsedAwardAmount(awardActivity);
        return redeemedAwardAmount;
    } catch(e) {
        let errmsg = "";
        if (e.faultDetail) {
            errmsg = e.faultDetail + " Line number: " + e.lineNumber;
        } else {
            errmsg = "Error in line number: " + e.lineNumber;
        }
        
        Logger.error(errmsg + "\nCardNumber=" + cardNumber);
        redeemedAwardAmount.error = true;
    }

    return redeemedAwardAmount;

};

function calculateUsedAwardAmount(awardActivity) {
    let amountTotal = 0.00;
    for (var i = 0; i < awardActivity.length; i++){
       if (awardActivity[i].transactionType == 'AutomaticRedeem' && awardActivity[i].errorCode == null){
            amountTotal += awardActivity[i].activityAmount;
        }
    }
    return amountTotal;
}

module.exports = {
    execute: execute,
    run: run
}