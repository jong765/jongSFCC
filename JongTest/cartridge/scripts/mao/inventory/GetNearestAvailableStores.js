/**
 * GetNearestAvailableStores.js
 * 
 *  Returns the stores and their distance from the specified location (either postal code or geolocation), 
 *  sorted in ascending order by distance.
 *
 *   @input  ProductId : String                 (Required)
 *   @input  Quantity : Number                  (Optional)
 *   @input  PostalCode : String                (Optional)
 *   @input  CurrentRequest : dw.system.Request (Optional)
 *   @output AvailableStores : dw.util.LinkedHashMap
 *
 */

importPackage( dw.object );
importPackage( dw.util );

var LogUtils = require('../util/LogUtils');
var Logger = LogUtils.getLogger("GetNearestAvailableStores");

function execute(args) {
    args.AvailableStores = get(args.ProductId, args.Quantity, args.PostalCode, args.CurrentRequest);
    return args.AvailableStores ? PIPELET_NEXT : PIPELET_ERROR;
}

function get(productId, quantity, postalCode, currentRequest) {
	var nearestAvailableStoreMap = null;
	
	try {
	    var nearestStoreMap = getNearestStoreMap(postalCode, currentRequest);
	    var nearestStoreIdList = getNearestStoreIdList(nearestStoreMap.keySet());
	    var nearestAvailableStoreMap = getNearestAvailableStoreMap(productId, quantity, nearestStoreMap, nearestStoreIdList);
	} catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        Logger.error(errMessage);
    }
    return nearestAvailableStoreMap;
}

function getNearestStoreMap(postalCode, currentRequest) {
	var nearestStoreMap = null;
    var distanceUnit = dw.system.Site.getCurrent().getCustomPreferenceValue('storeLookupUnit').value;
    var maxDistance = dw.system.Site.getCurrent().getCustomPreferenceValue('storeLookupMaxDistance').value;

    if (postalCode) {
        var countryCode = dw.system.Site.getCurrent().getCustomPreferenceValue('countryCode').value;
        nearestStoreMap = dw.catalog.StoreMgr.searchStoresByPostalCode(countryCode, postalCode, distanceUnit, maxDistance);
    } else {
        var latitude = currentRequest.geolocation.latitude;
        var longitude = currentRequest.geolocation.longitude;
        nearestStoreMap = dw.catalog.StoreMgr. searchStoresByCoordinates(latitude, longitude, distanceUnit, maxDistance);
    }

    return nearestStoreMap;
}

function getNearestStoreIdList(stores) {
    var storeIdList = new ArrayList();
    var storeArray = stores.toArray();
    storeArray.forEach(function(store) {
        storeIdList.add1(store.ID);
    });
    return storeIdList;
}

function getNearestAvailableStoreMap(productId, quantity, nearestStoreMap, nearestStoreIdList) {
    var availableStoreSet= new HashSet();
    var requestItems = new Array();
    requestItems.push(productId);
    var availabilityDetails = require('int_pacsun_api/cartridge/scripts/mao/service/AvailabilityDetailStoreService').getAvailabilityDetail(requestItems, nearestStoreIdList);
    availabilityDetails.forEach(function(availabilityDetail) {
        if (quantity) {
            if (availabilityDetail.quantity >= quantity) {
                availableStoreSet.add1(availabilityDetail.locationId);
            }
        } else {
            if (!availabilityDetail.status.equalsIgnoreCase("OUT_OF_STOCK")) {
                availableStoreSet.add1(availabilityDetail.locationId);
            }
        }
    });

    var nearestAvailableStoreMap = new LinkedHashMap();

    for (var store in nearestStoreMap) {
        var storeId = store.ID;
        var distance = nearestStoreMap.get(store);
        if (availableStoreSet.contains(storeId)) {
            nearestAvailableStoreMap.put(store, distance);
        }
    }

    return nearestAvailableStoreMap;
}

module.exports = {
    'execute': execute,
	'get': get
}