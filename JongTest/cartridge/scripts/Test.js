'use strict'

var OrderMgr = require('dw/order/OrderMgr');
var JK_DateUtil = require('JongTest/cartridge/scripts/js/JK_DateUtil.js');

function execute(args)
{
	var currentDate = JK_DateUtil.getCurrentDate("yyyy-mm-dd'T'hh:mm:ss");
	
	return PIPELET_NEXT;
}