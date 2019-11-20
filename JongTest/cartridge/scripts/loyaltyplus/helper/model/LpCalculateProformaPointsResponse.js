/**
 *  LpCalculateProformaPointsResponse.js
 * 
 *  LpCalculateProformaPointsResponse object 
 */
'use strict';

function LpCalculateProformaPointsResponse(success, data, errorMessage) {
	this.success = success;
	this.points = 0;
	this.errorMessage = errorMessage;
	
	if (success) {
		this.points = data.rule.ledger[0].points;
	}
}

module.exports = LpCalculateProformaPointsResponse;