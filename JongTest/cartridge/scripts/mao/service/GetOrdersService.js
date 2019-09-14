/**
 * GetOrdersService.ds
 * 
 *  Service that returns the orders for the specific email address.
 *
 *   @input  EmailAddress : String      (Required)
 *   @output Orders : Array
 *
 */

importPackage( dw.object );

var MaoServiceUtilities = require('../util/MaoServiceUtilities');
var GetOrdersResponseBuilder = require('../builder/GetOrdersResponseBuilder');
var Site = require('dw/system/Site');
var UrlPath = require('../util/MaoConstants').UrlPath;
var LogUtils = require('../util/LogUtils');
var Logger = LogUtils.getLogger("GetOrdersService");

function execute(args) {
    args.Orders = getOrders(args.EmailAddress);
    return args.Orders ? PIPELET_NEXT : PIPELET_ERROR;
}

function getOrders(emailAddress) {
    var orders = null;
    try {
        var maoServiceUtilities = new MaoServiceUtilities();
        var serviceName = Site.current.preferences.custom.maoApiServiceName;
        var endpointUrl = UrlPath.GET_ORDERS;
        var method = "POST";
        var requestParams = {};
        var service = maoServiceUtilities.createService(serviceName, endpointUrl, method);

        requestParams.emailAddress = emailAddress;
        requestParams.token = maoServiceUtilities.getAccessToken();

        maoServiceUtilities.setAuthToken(service, requestParams);

        var requestBody = buildRequest(requestParams);
        var response = maoServiceUtilities.processRequest(service, requestBody);
        orders = (new GetOrdersResponseBuilder()).buildResponse(response).get();
    } catch (e) {
        var exception = e;
        var errMessage = "Error in GetOrdersService. " + exception.message + "\n" + exception.stack;
        Logger.error(errMessage);
    }
    return orders;
}

function buildRequest (requestParams) {
    var requestBody = {};
    requestBody.Query = "CustomerEmail = " + "'" + requestParams.emailAddress + "'";
    requestBody.Sort =  {"attribute": "CreatedTimestamp", "direction" : "Desc"};
    requestBody.Template = {
        "OrderId": null,
        "FulfillmentStatus": null,
        "CreatedTimestamp": null,
        "UpdatedTimestamp": null
    };
    requestBody.Size = "10";
    return requestBody;
};

module.exports = {
    'execute': execute,
    'getOrders': getOrders
}