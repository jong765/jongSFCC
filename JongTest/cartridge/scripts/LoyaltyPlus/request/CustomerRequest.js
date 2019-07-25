'use strict';

/**
 * Require dependencies
 */
const StringUtils = require('dw/util/StringUtils');
const URLUtils = require('dw/web/URLUtils');
const Calendar = require('dw/util/Calendar');
const Util = require('~/cartridge/scripts/utils/Util');
const CustomerMgr = require('dw/customer/CustomerMgr');

/**
 * Get Delivery Date Estimation Object
 *
 * @param {String} zip
 * @param {String} country
 * @param {String} narvarCategory
 * @param {String} carrierCode
 * @returns {Object}
 */
exports.getEnrollRequest = function (email, customerId, firstName, lastName, address1, city) {
    let enrollRequest = {};
    
    enrollRequest.email = email;
    enrollRequest.external_customer_id = customerId;
    enrollRequest.first_name = firstName;
    enrollRequest.last_name = lastName;
    enrollRequest.address_line_1 = address1;
    enrollRequest.city = city;
    
    return enrollRequest;
}

exports.getUpdateEmailRequest = function (customerId, fromEmail, toEmail) {
    let updateEmailRequest = {};
    updateEmailRequest.external_customer_id = customerId;
    updateEmailRequest.from_email = fromEmail;
    updateEmailRequest.to_email = toEmail;

    return updateEmailRequest;
}