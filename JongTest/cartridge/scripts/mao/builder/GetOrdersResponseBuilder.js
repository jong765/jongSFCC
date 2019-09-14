(function () {
    'use strict';
    var ResponseBuilder = require('./ResponseBuilder');
    var LogUtils = require('../util/LogUtils');
    var Logger = LogUtils.getLogger("GetOrdersResponseBuilder");

    function GetOrdersResponseBuilder() {
        this.context = null;
    }

    GetOrdersResponseBuilder.prototype.get = function () {
        return this.context;
    }

    GetOrdersResponseBuilder.prototype.buildResponse = function (jsonResponse) {
        return this.init().buildOrders(jsonResponse);
    }

    GetOrdersResponseBuilder.prototype.init = function() {
        this.context = new ResponseBuilder();
        return this;
    }

    GetOrdersResponseBuilder.prototype.buildOrders = function(jsonResponse) {
        var orders = new Array();
        jsonResponse.data.forEach(function (object) {
            var Order = require('../model/Order');
            this.order = new Order();
            this.order.orderId = object.OrderId;
            if (object.FulfillmentStatus.equalsIgnoreCase("Fulfilled"))
                this.order.fulfillmentStatus = "Shipped";
            else if (object.FulfillmentStatus.equalsIgnoreCase("Cancelled"))
                this.order.fulfillmentStatus = "Cancelled";
            else
                this.order.fulfillmentStatus = "In Process";
            orders.push(order);
        });

        this.context = orders;
        return this;
    }

    function log(errorCode) {
        return 'Error when generating GetOrdersResponseBuilder. Error code: ' + errorCode;
    }
    module.exports = GetOrdersResponseBuilder;
}());