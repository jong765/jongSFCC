/**
 *  DateUtil.js
 *  
 *  Date utility functions for loyalty plus 	
 */
'use strict';

var DateUtil = {};
var StringUtils = require('dw/util/StringUtils');
var Calendar = require('dw/util/Calendar');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "DateUtil.js");

DateUtil.formatDate = function(theDate, dateFormat) {
	var dateString = new Calendar(theDate);
	dateString.timeZone = "PST";
	return StringUtils.formatCalendar(dateString, dateFormat);
}

DateUtil.formatDateString = function(dateString, dateFormat) {
	var newDateString = dateString.replace(/(\d{4})\-(\d\d)\-(\d\d)T/, "$1/$2/$3 ");
	var theDate = new Date(newDateString);
	var dateString = new Calendar(theDate);
	dateString.timeZone = "PST";
	return StringUtils.formatCalendar(dateString, dateFormat);
}

DateUtil.getCurrentDateString = function(dateFormat) {
	var calendar = new Calendar();
	calendar.timeZone = "PST";
    var currentDateString = StringUtils.formatCalendar(calendar, dateFormat);
    return currentDateString;
}

DateUtil.getDifferenceInDays = function(dateString1, date2) {
	var dateString1 = dateString1.replace(/(\d{4})\-(\d\d)\-(\d\d)T/, "$1/$2/$3 ");
	var date1 = new Date(dateString1);   //2592000000
	var difference_In_Time = date2.getTime() - date1.getTime();
	var difference_In_Days = difference_In_Time / (1000 * 3600 * 24);
	logger.debug("difference_In_Time: " + difference_In_Time);
	return difference_In_Days;
}

DateUtil.addDays = function (theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}

module.exports = DateUtil;