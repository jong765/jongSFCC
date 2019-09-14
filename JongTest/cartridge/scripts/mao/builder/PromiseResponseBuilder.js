(function () {
    'use strict';
    var ResponseBuilder = require('./ResponseBuilder');
    var LogUtils = require('../util/LogUtils');
    var Logger = LogUtils.getLogger("PromiseResponseBuilder");

    function PromiseResponseBuilder() {
        this.context = null;
    }

    PromiseResponseBuilder.prototype.get = function () {
        return this.context;
    }

    PromiseResponseBuilder.prototype.buildResponse = function (jsonResponse) {
        return this.init().buildAvailabilityDetail(jsonResponse);
    }

    PromiseResponseBuilder.prototype.init = function() {
        this.context = new ResponseBuilder();
        return this;
    }

    PromiseResponseBuilder.prototype.buildAvailabilityDetail = function(jsonResponse) {
        var availabilityDetailList = new Array();
        jsonResponse.data.forEach(function (object) {
            var AvailabilityDetail = require('../model/AvailabilityDetail');
            this.availabilityDetail = new AvailabilityDetail();
            this.availabilityDetail.itemId = object.ItemId;
            this.availabilityDetail.status = object.Status;
            this.availabilityDetail.viewName = object.ViewName;
            this.availabilityDetail.quantity = object.Quantity;
            this.availabilityDetail.totalQuantity = object.TotalQuantity;
            availabilityDetailList.push(this.availabilityDetail);
        });

        this.context = availabilityDetailList;
        return this;
    }

    function isAvailable(status, viewName) {
        
    }

    function log(errorCode) {
        return 'Error when generating PromiseResponseBuilder. Error code: ' + errorCode;
    }
    module.exports = PromiseResponseBuilder;
}());