/**
 * CheckInventory.js
 * 
 *  Returns true if the product is available in MAO global inventory.
 *
 *   @input  ProductId : String           (Required)
 *   @input  Quantity : Number            (Optional)
 *   @input  ShippingMethodId : String    (Optional) ... but required for expedited(overnight) shipping.
 *   @input  InternationalOrder : Boolean (Required)
 *   @output IsAvailable : Boolean
 * 
 */

importPackage( dw.util );

var LogUtils = require('../util/LogUtils');
var Logger = LogUtils.getLogger("CheckInventory");

function execute(args) {
    args.IsAvailable = check(args.ProductId, args.Quantity, args.ShippingMethodId, args.InternationalOrder);
    return args.IsAvailable ? PIPELET_NEXT : PIPELET_ERROR;
}

function check(productId, quantity, shippingMethodId, internationalOrder) {
    var requestItems = new Array();
    requestItems.push(productId);
    var isAvailable = null;

    try {
        // Call MAO availabilityDetail API
        var expeditedShippingMethods = dw.system.Site.current.preferences.custom.maoExpeditedShippingMethods;
        var availabilityDetail = require('int_pacsun_api/cartridge/scripts/mao/service/AvailabilityDetailService').getAvailabilityDetail(requestItems, internationalOrder)[0];

        if (expeditedShippingMethods.indexOf(shippingMethodId) != -1) {
            isAvailable = availabilityDetail.quantity.DistributionCenters >= quantity ? true : false;
        } else {
            isAvailable = availabilityDetail.totalQuantity >= quantity ? true : false;
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        Logger.error(errMessage);
        isAvailable = true;
    }
    return isAvailable;
}

module.exports = {
    'execute': execute,
    'check': check
}