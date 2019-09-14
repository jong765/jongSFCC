(function () {
    'use strict';

    var RequestBuilder = function () {};

    var log = function (name) {
        return 'Abstract method "' + name + '" must be override';
    }

    RequestBuilder.prototype.buildRequest = function (params) {
        throw new Error(log('buildRequest'));
    }

    RequestBuilder.prototype.get = function () {
        throw new Error(log('get'));
    }

    module.exports = RequestBuilder;

}());