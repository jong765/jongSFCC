
function execute(args)
{
	var OrderMgr = require('dw/order/OrderMgr');
	var order = OrderMgr.getOrder("70038129");
	for each (var pli in order.getProductLineItems()) {
        var product = pli.product;
        var test = 1;
	}
	return PIPELET_NEXT;
}