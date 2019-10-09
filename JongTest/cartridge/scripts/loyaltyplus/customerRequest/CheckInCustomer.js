/********************************************************************************************
 *  CheckInCustomer.js
 * 
 *  Take care of processes when customer checks in.
 *
 *   @input lpExternalCustomerId : String
 *   @input enrollmentDate : String
 *   @input marketingId : String
 *   @output responseObject : Object
 */

var GetCustomerEvents = require('../customerRequest/GetCustomerEvents');
var RecordCheckInEvent = require('../event/RecordCheckInEvent');
var Util = require('../util/Util');
var DateUtil = require('../util/DateUtil');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "CheckInCustomer.js");

function execute(args) {
	var responseObject = run(args.lpExternalCustomerId, args.enrollmentDate, args.marketingId);
    args.responseObject = responseObject;
    return result.responseObject ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId, enrollmentDate, marketingId) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        // Check in if 7 days passed since last check in and enrollment date
        if (over7DaysSinceEnrollmentDate(enrollmentDate) && over7DaysSinceLastCheckIn(lpExternalCustomerId)) {
        	responseObject = RecordCheckInEvent.run(lpExternalCustomerId, marketingId);
        } else {
        	responseObject = {success : true};
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

function over7DaysSinceEnrollmentDate(enrollmentDate) {
	enrollmentDate = enrollmentDate.replace(/(\d{4})\-(\d\d)\-(\d\d)T/, "$1/$2/$3 ");
	logger.debug("enrollmentDate: " + enrollmentDate);
	var isOver7Days = false;
	try {
		var date1 = new Date(enrollmentDate);
		var date2 = new Date();
		var seconds1 = date1.getTime();
		var seconds2 = date2.getTime();
		var duration_day = (seconds2 - seconds1)/(1000 * 60 * 60 * 24);
		logger.debug("duration_day: " + duration_day);
		isOver7Days = duration_day >= 7;
	} catch(e) {
		var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
	}
	logger.debug("over7DaysSinceEnrollmentDate: " + isOver7Days);
	return isOver7Days;
}

function over7DaysSinceLastCheckIn(lpExternalCustomerId) {
	var isOver7Days = false;
	try {
		var eventType = "checkin";
		var dateFilter = "created_at";
		var sevenDaysAgo = DateUtil.formatDate(DateUtil.addDays(new Date(), -7), "yyyy-MM-dd'T'HH:MM:ss");
		var result = GetCustomerEvents.run(lpExternalCustomerId, eventType, dateFilter, sevenDaysAgo, null, null);
		if (result.success && result.data.length == 0) {
			isOver7Days = true;
		}
	} catch(e) {
		var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
	}
	logger.debug("over7DaysSinceLastCheckIn: " + isOver7Days);
	return isOver7Days;
}

module.exports = {
    'execute': execute,
    'run': run
}