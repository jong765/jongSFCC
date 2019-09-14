(function () {
    'use strict';

    var ResponseBuilder = function () {};

    var log = function (name) {
        return 'Abstract method "' + name + '" must be override';
    }

    ResponseBuilder.prototype.buildResponse = function (params) {
        throw new Error(log('buildResponse'));
    }

    ResponseBuilder.prototype.get = function () {
        throw new Error(log('get'));
    }

    module.exports = ResponseBuilder;

}());