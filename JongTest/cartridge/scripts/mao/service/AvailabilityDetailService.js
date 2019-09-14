/**
 * AvailabilityDetailService.js
 * 
 *  Service that returns the MAO inventory availability details for the products.
 *   Use ECOM view for global inventory check and BOPIS view for store pickup.
 *
 *   @input  Items : Array      (Required)
 *   @input  InternationalOrder : Boolean (Required)
 *   @output AvailabilityDetails : Array
 *
 */

importPackage( dw.object );

var MaoServiceUtilities = require('../util/MaoServiceUtilities');
var AvailabilityDetailResponseBuilder = require('../builder/AvailabilityDetailResponseBuilder');
var UrlPath = require('../util/MaoConstants').UrlPath;
var Site = require('dw/system/Site');
var LogUtils = require('../util/LogUtils');
var Logger = LogUtils.getLogger("AvailabilityDetailService");

function execute(args) {
    args.AvailabilityDetails = getAvailabilityDetail(args.Items, args.InternationalOrder);
    return args.AvailabilityDetails ? PIPELET_NEXT : PIPELET_ERROR;
}

function getAvailabilityDetail(items, internationalOrder) {
    var availabilityDetails = null;
    try {
        var maoServiceUtilities = new MaoServiceUtilities();
        var serviceName = Site.current.preferences.custom.maoApiServiceName;
        var endpointUrl = UrlPath.AVAILABILITY_DETAIL;
        var method = "POST";
        var requestParams = {};

        requestParams.token = maoServiceUtilities.getAccessToken();
        requestParams.items = items;
        requestParams.internationalOrder = internationalOrder;

        var service = maoServiceUtilities.createService(serviceName, endpointUrl, method);
        maoServiceUtilities.setAuthToken(service, requestParams);
        var requestBody = buildRequest(requestParams);

        var response = maoServiceUtilities.processRequest(service, requestBody);
        availabilityDetails = (new AvailabilityDetailResponseBuilder()).buildResponse(response).get();
    } catch (e) {
        var exception = e;
        var errMessage = "Error in AvailabilityDetailService. " + exception.message + "\n" + exception.stack;
        Logger.error(errMessage);
    }
    return availabilityDetails;
}

function buildRequest(requestParams) {
    var requestBody = {};
    requestBody.Items = requestParams.items;
    if (requestParams.internationalOrder)
        requestBody.ViewName = Site.current.preferences.custom.maoDcAvailabilityView;
    else
        requestBody.ViewName = Site.current.preferences.custom.maoEcomAvailabilityView;
    return requestBody;
}

module.exports = {
    'execute': execute,
	'getAvailabilityDetail': getAvailabilityDetail
}