/**
 * GetCustomerEvents.js
 * 
 * Get history of point earning events completed by a customer. Either
 * externalCustomerId or emailAddress is required.
 * 
 * @input externalCustomerId : String
 * @input emailAddress : String
 * @input eventType : String if present, retrieve all events
 * @input afterDate : String if not present, only return events after given
 *        date/time (including that date)
 * @input beforeDate : String if not present, only return events before the
 *        given date/time (excluding that date)
 * @input dateFilter : String Possible values: created_at, updated_at or
 *        expires_at. Default is created_at.
 * @input pageNumber : Number For pagination
 * @input entriesPerPage : Number For pagination
 * @output success : Boolean
 * @output data : Object
 * @output errorMessage : String
 */

var CustomerEventsService = require('../helper/service/CustomerEventsService');
var LpResponse = require('../helper/model/LpResponse');
var Util = require('../helper/util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error",
		"GetCustomerEvents.js");

function execute(args) {
	var response = run(args.externalCustomerId, args.emailAddress,
			args.eventType, args.afterDate, args.beforeDate, args.dateFilter,
			args.pageNumber, args.entriesPerPage);
	args.success = response.success;
	args.data = response.data;
	args.errorMessage = response.errorMessage;
	return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId, emailAddress, eventType, afterDate,
		beforeDate, dateFilter, pageNumber, entriesPerPage) {
	var response = {};
	var validationResult = {};
	try {
		validationResult.success = !empty(emailAddress)
				|| !empty(externalCustomerId);
		if (!validationResult.success) {
			return validationResult;
		}
		var result = CustomerEventsService.run(externalCustomerId,
				emailAddress, eventType, afterDate, beforeDate, dateFilter,
				pageNumber, entriesPerPage).object;
		var data = result.data;
		if (data) {
			response = new LpResponse(result.success, data, result.errorMessage);
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
	'execute' : execute,
	'run' : run
}