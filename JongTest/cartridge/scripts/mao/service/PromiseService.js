/**
 * PromiseService.js
 * 
 *  Service that reserves the MAO inventory for the products in the order.
 *
 *   @input  OrderNo : String               (Required)
 *   @input  ShipToAddress : Object         (Required)
 *   @input  ProductLineItems : Array       (Required)
 *   @output Success : Boolean
 *
 */

importPackage( dw.object );

var MaoServiceUtilities = require('../util/MaoServiceUtilities');
var Address = require('../model/Address');
var PromisingRequestDetail = require('../model/PromisingRequestDetail');
var UrlPath = require('../util/MaoConstants').UrlPath;
var Site = require('dw/system/Site');
var Calendar = require('dw/util/Calendar');
var StringUtils = require('dw/util/StringUtils');
var LogUtils = require('../util/LogUtils');
var Logger = LogUtils.getLogger("PromiseService");

function execute(args) {
    args.Success = promiseRequest(args.OrderNo, args.ShipToAddress, args.ProductLineItems);
    return args.Success ? PIPELET_NEXT : PIPELET_ERROR;
}

function promiseRequest(orderNo, shipToAddress, productLineItems) {
    var success = null;
    try {
        var maoServiceUtilities = new MaoServiceUtilities();
        var serviceName = Site.current.preferences.custom.maoApiServiceName;
        var endpointUrl = UrlPath.PROMISE;
        var method = "POST";
        var requestParams = {};

        requestParams.token = maoServiceUtilities.getAccessToken();
        requestParams.orderNo = orderNo;
        requestParams.shipToAddress = shipToAddress;
        requestParams.productLineItems = productLineItems;
        requestParams.reservationExpiryDate = getReservationExpiryDate();

        var service = maoServiceUtilities.createService(serviceName, endpointUrl, method);
        maoServiceUtilities.setAuthToken(service, requestParams);
        var requestBody = buildRequest(requestParams);
        var response = maoServiceUtilities.processRequest(service, requestBody);
        success = response.success;
    } catch (e) {
        var exception = e;
        var errMessage = "Error in PromiseService. " + exception.message + "\n" + exception.stack;
        Logger.error(errMessage);
    }
    return success;
}

function buildRequest(requestParams) {
    return buildInit(requestParams).buildPromisingRequestDetail(requestParams).context;
}

function buildInit(requestParams) {
    this.context = {};
    this.context.PromisingRequestId = requestParams.orderNo;
    this.context.DemandType = "Allocation";
    this.context.IsConfirmed = true;
    this.context.RequestType = "Reservation";
    this.context.ReservationExpiryDate = requestParams.reservationExpiryDate;
    return this;
}

function buildPromisingRequestDetail(requestParams) {
    var promisingRequestDetailArray = new Array();

    requestParams.productLineItems.forEach(function (lineItem) {
        var promisingRequestDetail = new PromisingRequestDetail();
        promisingRequestDetail.Address = buildAddress(requestParams);
        promisingRequestDetail.PromisingRequestDetailId = lineItem.OrderLineId;
        promisingRequestDetail.ItemId = lineItem.ItemId;
        promisingRequestDetail.Quantity = lineItem.Quantity;
        promisingRequestDetail.DeliveryMethodId = lineItem.DeliveryMethodId;
        promisingRequestDetail.ShippingMethodId = lineItem.ShippingMethodId;
        promisingRequestDetailArray.push(promisingRequestDetail);
    });
    this.context.PromisingRequestDetail = promisingRequestDetailArray;
    return this;
}

function buildAddress(requestParams) {
    var address = new Address();
    address.setAddress1(requestParams.shipToAddress.address1);
    address.setAddress2(requestParams.shipToAddress.address2);
    address.setCity(requestParams.shipToAddress.city);
    address.setFirstName(requestParams.shipToAddress.firstName);
    address.setLastName(requestParams.shipToAddress.lastName);
    address.setPostalCode(requestParams.shipToAddress.postalCode);
    address.setState(requestParams.shipToAddress.state);
    address.setCountry(requestParams.shipToAddress.country);
    address.setEmail(requestParams.shipToAddress.email);
    return address;
}

function getReservationExpiryDate() {
    var expiryCalendar = new Calendar();
    expiryCalendar.timeZone = "PST";
    expiryCalendar.add(expiryCalendar.HOUR, Site.current.preferences.custom.maoInventoryReservationDuration);
    var expiryDate = StringUtils.formatCalendar(expiryCalendar, "yyyy-MM-dd'T'hh:mm:ss");
    return expiryDate;
}

module.exports = {
    'execute': execute,
	'promiseRequest': promiseRequest
}