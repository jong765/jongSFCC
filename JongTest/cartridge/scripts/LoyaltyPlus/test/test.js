'use strict'

const ApiService = require('../service/ApiService');

function execute(args) {
    let response = ApiService.ping();
    
    return PIPELET_NEXT;
}

module.exports = {
	'execute': execute
}