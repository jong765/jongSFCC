/**
 * AvailabilityDetailStoreService.js
 * 
 *  Service that returns the MAO BOPIS inventory availability details for the products.
 *
 *   @input  Items : Array      (Required)
 *   @input  Stores : Array     (Required)
 *   @output AvailabilityDetails : Array
 *
 */

importPackage( dw.object );

var MaoServiceUtilities = require('../util/MaoServiceUtilities');
var AvailabilityDetailStoreResponseBuilder = require('../builder/AvailabilityDetailStoreResponseBuilder');
var UrlPath = require('../util/MaoConstants').UrlPath;
var Site = require('dw/system/Site');
var LogUtils = require('../util/LogUtils');
var Logger = LogUtils.getLogger("AvailabilityDetailStoreService");

function execute(args) {
    args.AvailabilityDetails = getAvailabilityDetail(args.Items, args.Stores);
    return args.AvailabilityDetails ? PIPELET_NEXT : PIPELET_ERROR;
}

function getAvailabilityDetail(items, storeList) {
    var availabilityDetails = null;
    try {
        var maoServiceUtilities = new MaoServiceUtilities();
        var serviceName = Site.current.preferences.custom.maoApiServiceName;
        var endpointUrl = UrlPath.AVAILABILITY_DETAIL_BOPIS;
        var method = "POST";
        var requestParams = {};

        requestParams.token = maoServiceUtilities.getAccessToken();
        requestParams.items = items;
        requestParams.stores = storeList.toArray();

        var service = maoServiceUtilities.createService(serviceName, endpointUrl, method);
        maoServiceUtilities.setAuthToken(service, requestParams);
        var requestBody = buildRequest(requestParams);

        var response = maoServiceUtilities.processRequest(service, requestBody);
        availabilityDetails = (new AvailabilityDetailStoreResponseBuilder()).buildResponse(response).get();
    } catch (e) {
        var exception = e;
        var errMessage = "Error in AvailabilityDetailStoreService. " + exception.message + "\n" + exception.stack;
        Logger.error(errMessage);
    }

    return availabilityDetails;
}

function buildRequest(requestParams) {
    var items = requestParams.items;
    var stores = requestParams.stores;

    var requestBody = {};
    requestBody.Items = items;
    var viewName = Site.current.preferences.custom.maoBopisAvailabilityView;
    requestBody.Locations = stores;
    requestBody.ViewName = viewName;
    return requestBody;
}

module.exports = {
    'execute': execute,
	'getAvailabilityDetail': getAvailabilityDetail
}