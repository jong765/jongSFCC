/**
 * CheckStoreInventory.js
 * 
 *  Returns true if the product is available in the MAO store BOPIS inventory.
 *
 *   @input  ProductId : String     (Required)
 *   @input  Quantity : Number      (Optional)
 *   @input  Store : String         (Required)
 *   @output IsAvailable : Boolean
 *
 */

importPackage( dw.object );
importPackage( dw.util );

var LogUtils = require('../util/LogUtils');
var Logger = LogUtils.getLogger("CheckStoreInventory");

function execute(args) {
    args.IsAvailable = check(args.ProductId, args.Quantity, args.Store);
    return args.IsAvailable ? PIPELET_NEXT : PIPELET_ERROR;
}

function check(productId, quantity, store) {
    var isAvailable = false;
    try {
        var requestItems = new Array();
        var storeList = new ArrayList();
        requestItems.push(productId);
        storeList.add1(store);
        var availabilityDetail = require('int_pacsun_api/cartridge/scripts/mao/service/AvailabilityDetailStoreService').getAvailabilityDetail(requestItems, storeList)[0];
        if (availabilityDetail.quantity >= quantity)
            isAvailable = true;
        else
            isAvailable = false;
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
    'check' : check
}