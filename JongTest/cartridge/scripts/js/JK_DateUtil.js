'use strict';

var Calendar = require('dw/util/Calendar');
var StringUtils = require('dw/util/StringUtils');

var DateUtil = {};

// sample date formats: yyyy-mm-dd'T'hh:mm:ss
DateUtil.getCurrentDate = function (dateFormat) {
	var calendar = new Calendar();
	calendar.timeZone = "PST";
    var currentDateString = StringUtils.formatCalendar(calendar, dateFormat);
    return currentDateString;
}

module.exports = DateUtil;