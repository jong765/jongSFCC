/**
 * CalculateProformaPointsResponse.js
 * 
 * CalculateProformaPointsResponse object
 */
'use strict';

function CalculateProformaPointsResponse(object, errorMessage) {
	this.success = object.success;
	this.points = 0;
	this.errorMessage = errorMessage;

	if (this.success) {
		this.points = object.points;
	}
}

module.exports = CalculateProformaPointsResponse;