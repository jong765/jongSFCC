'use strict';
var Class = require('../util/Class').Class;

var AvailabilityDetail = Class.extend({
    itemId: null,
    locationId: null,
    status: null,
    viewName: null,
    quantity: {
        "DistributionCenters": 0,
        "Stores": 0
    },
    totalQuantity: 0
});

module.exports = AvailabilityDetail;