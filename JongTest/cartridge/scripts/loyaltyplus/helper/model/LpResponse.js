/**
 * LpResponse.js
 * 
 * LpResponse object
 */
'use strict';

function LpResponse(success, data, errorMessage) {
	this.success = success;
	this.data = data;
	this.errorMessage = errorMessage;
}

module.exports = LpResponse;