/**
 * LpCalculateProformaPointsResponse.js
 * 
 * LpCalculateProformaPointsResponse object
 */
'use strict';

function LpCalculateProformaPointsResponse(object, errorMessage) {
	this.success = object.success;
	this.points = 0;
	this.errorMessage = errorMessage;

	if (this.success) {
		this.points = object.points;
	}
}

module.exports = LpCalculateProformaPointsResponse;