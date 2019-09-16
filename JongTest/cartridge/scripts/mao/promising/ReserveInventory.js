/**
* ReserveInventory.js
* 
*  Reserves the MAO inventory for the products that are to be picked up in store.
*
*    @input Order : dw.order.Order     (Required)
*    @output Success : Boolean
*
*/
importPackage( dw.system );
importPackage( dw.util );
importPackage( dw.object );
importPackage( dw.order );

function execute(args) {
    args.Success = reserve(args.Order);
    return args.Success ? PIPELET_NEXT : PIPELET_ERROR;
}

function reserve(order) {
    var success = null;
    try {
        var shippingAddress = order.shipments[0].shippingAddress;
        var shippingLineItems = order.shipments[0].productLineItems;

        var promiseService = require('int_pacsun_api/cartridge/scripts/mao/service/PromiseService');

        var orderNo = order.orderNo;
        var shipToAddress = {};
        shipToAddress.address1 = shippingAddress.address1;
        shipToAddress.address2 = shippingAddress.address2;
        shipToAddress.firstName = shippingAddress.firstName;
        shipToAddress.lastName = shippingAddress.lastName;
        shipToAddress.city = shippingAddress.city;
        shipToAddress.postalCode = shippingAddress.postalCode;
        shipToAddress.state = shippingAddress.stateCode;
        shipToAddress.country = shippingAddress.countryCode.value;
        shipToAddress.email = order.customerEmail;

        var productLineItems = new Array();
        var needToReserve = false;

        var shippingLineItemIT = shippingLineItems.iterator();
        while(shippingLineItemIT.hasNext())
        {
            var lineItem = shippingLineItemIT.next();

            //Reserve MAO inventory for BOPIS product line items only.
            if (lineItem.custom.pickTicketCode.equalsIgnoreCase("PCK")) {
                productLineItems.push({
                    "ItemId": lineItem.productID,
                    "Quantity": lineItem.quantity.value,
                    "OrderLineId": lineItem.position,
                    "DeliveryMethodId": "PickUpAtStore",
                    "ShippingMethodId": lineItem.shipment.shippingMethod.displayName
                });
                needToReserve = true;
            }
        }

        if (needToReserve)
            success = promiseService.promiseRequest(orderNo, shipToAddress, productLineItems);
        else 
            success = true;
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        Logger.error(errMessage);
    }
        
    return success;
}

module.exports = {
    'execute': execute,
	'reserve': reserve
}
