'use strict'

/**
 * Controller : Test
 *
 * @module controllers/Test
 */
var Util = require('../util/Util');
var DateUtil = require('../util/DateUtil');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-test", "Test.js");

var externalCustomerId = "84804765"; //jktest20@pacsun.com
var emailAddress = "jktest54@pacsun.com";

function run() {
	//var response = lookupCustomer();
	//var response = enrollCustomer();
	//var response = showCustomer();
	//var response = updateCustomerInfo();
	//var response = getCustomerEvents();
	//var response = getCustomerPointRuleGroups();
	//var response = getCustomerCoupons();
	//var response = pauseCustomer();
	//var response = reactivateCustomer();
	//var response = checkIn();
	//var response = completeProfile();
	//var response = purchase();
	//var response = rejectPurchase();
	//var response = returnn();
	//var response = recordCheckInEvent();
	var response = likeProduct();
	//var response = postReview();
	//var response = updateShoppingPreference();
	//var response = updatePreferredStore();
	//var response = getSignature();
	//var response = testDate();
	//var response = formatDate();
	//var response = getDifferenceInDays();

	logResponse(response);
	return true;
}

function getCustomerPointRuleGroups() {
	var getCustomerPointRuleGroups = require('../customerRequest/GetCustomerPointRuleGroups');
	var response = getCustomerPointRuleGroups.run(externalCustomerId);
	return response;
}

function showCustomer() {
	var showCustomer = require('../customerRequest/ShowCustomer');
	var include = "coupons,member_attributes";
	var response = showCustomer.run(externalCustomerId, include);
	return response;
}

function lookupCustomer() {
	var lookupCustomer = require('../customerRequest/LookupCustomer');
	var response = lookupCustomer.run(emailAddress);
	return response;
}

function enrollCustomer() {
	var enrollCustomer = require('../customerRequest/EnrollCustomer');
	var firstName = "Jong"
	var lastName = "Kim";
	var birthDate = "0717";
	var shoppingPreference = null;
	var addressLine1 = "3450 E Miraloma Ave";
	var addressLine2 = null;
	var city = "Anaheim";
	var postalCode = "92806";
	var state = "CA";
	var mobilePhone = "1112223333";
	var marketingId = "DSK";
	var acceptedTermsConditions = null;
	var response = enrollCustomer.run(emailAddress, firstName, lastName, birthDate, shoppingPreference,
			addressLine1, addressLine2, city, postalCode, state, mobilePhone, marketingId, acceptedTermsConditions);

    return response;
}

function updateCustomerInfo() {
	var firstName = "Jong"; 
	var lastName = "Kim";
	var birthDate = "1209";
	var shoppingPreference = "Male";
	var addressLine1 = "3030 Softwind way";
	var addressLine2 = null;
	var city = "Torrance";
	var postalCode = "90506";
	var state = "CA";
	var mobilePhone = "3373373347";
	var acceptedTermsConditions = false;
	var newEmailAddress = null;
	var updateCustomerInfo = require('../customerRequest/UpdateCustomerInfo');
	var response = updateCustomerInfo.run(externalCustomerId, firstName, lastName, birthDate, shoppingPreference, addressLine1, addressLine2, city, 
			postalCode, state, mobilePhone, acceptedTermsConditions, newEmailAddress);
	return response;
}

function getCustomerEvents() {
	var getCustomerEvents = require('../customerRequest/GetCustomerEvents');
	var eventType = null;
	var afterDate = null;
	var beforeDate = null;
	var dateFilter = null;
	var pageNumber = null;
	var entriesPerPage = null;
	var response = getCustomerEvents.run(externalCustomerId, eventType, afterDate, beforeDate, dateFilter, pageNumber, entriesPerPage);
	return response;
}

function postReview() {
	var marketingId = "DSK";
	var postReview = require('../event/PostReview');
	var response = postReview.run(externalCustomerId, marketingId);
	return response;
}

function likeProduct() {
	var marketingId = "DSK";
	var LikeProduct = require('../event/LikeProduct');
	var response = LikeProduct.run(externalCustomerId, marketingId);
	return response;
}

function checkIn() {
	var externalCustomerId = "75803173"; //jktest2@pacsun.com
	var enrollmentDate = "2019-10-02T16:07:21-07:00";
	var marketingId = "DSK";
	var checkIn = require('../event/CheckIn');
	var response = checkIn.run(externalCustomerId, marketingId);
	return response;
}

function getCustomerCoupons() {
	var getCustomerCoupons = require('../customerRequest/GetCustomerCoupons');
	var externalCustomerId = "75803173";
	var response = getCustomerCoupons.run(externalCustomerId);
	return response;
}

function reactivateCustomer() {
	var reactivateCustomer = require('../customerRequest/ReactivateCustomer');
	var externalCustomerId = "93301125"; //jktest20@pacsun.com
	var response = reactivateCustomer.run(externalCustomerId);
	return response;
}

function pauseCustomer() {
	var pauseCustomer = require('../customerRequest/PauseCustomer');
	var externalCustomerId = "93301125"; //jktest20@pacsun.com
	var response = pauseCustomer.run(externalCustomerId);
	return response;
}

function rejectPurchase() {
	var rejectPurchase = require('../event/RejectPurchase');
	var externalCustomerId = "93301125"; //jktest20@pacsun.com
	var orderNo = "70039325";
	var response = rejectPurchase.run(externalCustomerId, orderNo);
	return response;
}

function purchase() {
	var purchase = require('../event/Purchase');
	var externalCustomerId = "98574038"; //jkupdt36@pacsun.com
	var orderNo = "70039627";
	var response = purchase.run(externalCustomerId, orderNo);
	return response;
}

function returnn() {
	var returnn = require('../event/Return');
	var lpExternalCustomerId = "98574038";
	var orderNo = "70037929";
	var response = returnn.run(lpExternalCustomerId, orderNo);
	return response;
}

function completeProfile() {
	var lpExternalCustomerId = "94387328";
	var emailAddress = "jktest33@pacsun.com";
	var firstName = "Jong";
	var lastName = "Kim";
	var birthDate = "0803";
	var postalCode = "92806";
	var shoppingPreference = "Both";
	var marketingId = "DSK";
	var completeProfile = require('../event/CompleteProfile');
	var response = completeProfile.run(lpExternalCustomerId, emailAddress, firstName, lastName, birthDate, postalCode, shoppingPreference, marketingId);
	return response;
}

function formatDate() {
	var sevenDaysAgo = DateUtil.formatDate(DateUtil.addDays(new Date(), -7), "yyyy-MM-dd'T'HH:MM:ss");
	return sevenDaysAgo;
}

function formatDateString() {
	var dateString = "2019-10-04T16:07:21-0700";
	//var dateString = "2019/10/04 16:07:21-0700";
	var dateFormat = "MM/dd/yyyy HH:MM:ss";
	var response = DateUtil.formatDate(dateString, dateFormat);
	return response;
}

function getDifferenceInDays() {
	//var dateFormat = "yyyy-MM-dd'T'HH:MM:ss-HH:MM";
	//var dateFormat = "yyyy-MM-dd'T'HH:MM:ss.SSS"; HH:mm:ss
	var dateString1 = "2019-10-04T16:07:21-0700";
	var date2 = new Date();
	var response = DateUtil.getDifferenceInDays(dateString1, date2);
	return response;
}

function recordCheckInEvent() {
	var lpExternalCustomerId = "75587003";
	var recordCheckInEvent = require('../event/RecordCheckInEvent');
	var response = recordCheckInEvent.run(lpExternalCustomerId);
	return response;
}

function getSignature() {
	var MessageDigest = require('dw/crypto/MessageDigest');
	var Encoding = require('dw/crypto/Encoding');
	var Bytes = require('dw/util/Bytes');

	dataToSign = "ca0c46ce6e2e9fb10b87c50066b68e26address_line_13450 E Miraloma Avebirthdate03-12cityAnaheimcustom_attributespref_store0001shopping_preferenceBothemailjktest18@pacsun.comfirst_nameDMTESTlast_nameACCEPT5mobile_phone3733329983postal_code92806stateCAuuid89b92da9af02c8";

	var encryptor = new MessageDigest('MD5');

	var signature = Encoding.toHex(encryptor.digestBytes(new Bytes(dataToSign, "UTF-8")));
	return signature; //1b9ca3c20db0dc265de93478481ae97f
}

function updateShoppingPreference() {
	var updateShoppingPreference = require('../customerRequest/UpdateShoppingPreference');
	var externalCustomerId = "96132844";
	var shoppingPreference = "Female";

	var response = updateShoppingPreference.run(externalCustomerId, shoppingPreference);
    return response;
}

function updatePreferredStore() {
	var updateShoppingPreference = require('../customerRequest/UpdatePreferredStore');
	var externalCustomerId = "75587003";
	var preferredStore = "0010";

	var response = updateShoppingPreference.run(externalCustomerId, preferredStore);
    return response;
}

function logResponse(response) {
	logger.debug("response: " + JSON.stringify(response));
	return;
}

module.exports.run = run;