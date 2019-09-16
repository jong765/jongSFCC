/**
* Script file for use in the Script pipelet node.
* To define input and output parameters, create entries of the form:
*
* @<paramUsageType> <paramName> : <paramDataType> [<paramComment>]
*
* where
*   <paramUsageType> can be either 'input' or 'output'
*   <paramName> can be any valid parameter name
*   <paramDataType> identifies the type of the parameter
*   <paramComment> is an optional comment
*
* For example:
*
*-   @input ExampleIn : String This is a sample comment.
*-   @output ExampleOut : Number
*
*/

var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');
var ReserveInventory = require('JongTest/cartridge/scripts/mao/promising/ReserveInventory.js');

function execute( args : PipelineDictionary ) : Number
{

   return PIPELET_NEXT;
}

function reserveInventory () {
	var order = OrderMgr.getOrder("70039025");
	var shippingLineItems = order.shipments[0].productLineItems;
	var shippingLineItemIT = shippingLineItems.iterator();
	var counter = 0;
    while(shippingLineItemIT.hasNext())
    {
        var lineItem = shippingLineItemIT.next();
        if (counter == 1) {
        	Transaction.wrap(function() {
        		lineItem.custom.pickTicketCode = "PCK";
        	});
        }
        counter++;
    }
	
	ReserveInventory.reserve(order);
}

module.exports = {
	    'execute': execute,
		'reserveInventory': reserveInventory
}

