'use strict'

/**
 * Controller : Test
 *
 * @module controllers/Test
 */
var Util = require('../util/Util');
var DateUtil = require('../util/DateUtil');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-test", "Test.js");

function run() {
	//var response = enrollCustomer();
	//var response = updateCustomerInfo();
	//var response = lookupCustomer();
	//var response = showCustomer();
	//var response = checkIn();
	//var response = completeProfile();
	//var response = purchase();
	var response = returnn();
	//var response = recordCheckInEvent();
	//var response = likeProduct();
	//var response = getCustomerCheckInEvents();
	//var response = updateShoppingPreference();
	//var response = updatePreferredStore();
	//var response = enrollPOST();
	//var response = getSignature();
	//var response = testDate();
	//var response = formatDate();
	//var response = getDifferenceInDays();

	logResponse(response);
	return true;
}

function completeProfile() {
	var lpExternalCustomerId = "94387328";
	var emailAddress = "jktest25@pacsun.com";
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

function likeProduct() {
	var lpExternalCustomerId = "94387328"; //jktest25@pacsun.com
	var marketingId = "DSK";
	var LikeProduct = require('../event/LikeProduct');
	var response = LikeProduct.run(lpExternalCustomerId, marketingId);
	return response;
}

function showCustomer() {
	var showCustomer = require('../customerRequest/ShowCustomer');
	var lpExternalCustomerId = "75587003"; //jktest1@pacsun.com
	var response = showCustomer.run(lpExternalCustomerId);
	return response;
}

function enrollCustomer() {
	var enrollCustomer = require('../customerRequest/EnrollCustomer');
	var emailAddress = "jktest32@pacsun.com";
	var firstName = "Jong"
	var lastName = "Kim";
	var birthDate = "04-17";
	var shoppingPreference = "Both";
	var addressLine1 = "3450 E Miraloma Ave";
	var addressLine2 = null;
	var city = "Anaheim";
	var postalCode = "92806";
	var state = "CA";
	var mobilePhone = "3733329983";
	var marketingId = "DSK";
	var response = enrollCustomer.run(emailAddress, firstName, lastName, birthDate, shoppingPreference,
			addressLine1, addressLine2, city, postalCode, state, mobilePhone, marketingId);

    return response;
}

function checkIn() {
	var lpExternalCustomerId = "94387328"; //jktest25@pacsun.com
	var enrollmentDate = "2019-10-02T16:07:21-07:00";
	var marketingId = "DSK";
	var checkIn = require('../event/CheckIn');
	var response = checkIn.run(lpExternalCustomerId, enrollmentDate, marketingId);
	return response;
}

function formatDate() {
	var sevenDaysAgo = DateUtil.formatDate(DateUtil.addDays(new Date(), -7), "yyyy-MM-dd'T'HH:MM:ss");
	return sevenDaysAgo;
}

function getCustomerCheckInEvents() {
	var getCustomerEvents = require('../customerRequest/GetCustomerEvents');
	var lpExternalCustomerId = "93301125"; //jktest20@pacsun.com
	var eventType = "checkin";
	var dateFilter = "created_at";
	var afterDate = DateUtil.formatDate(DateUtil.addDays(new Date(), -7), "yyyy-MM-dd'T'HH:MM:ss");
	var response = getCustomerEvents.run(lpExternalCustomerId, eventType, dateFilter, afterDate, null, null);
	return response;
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

function updateCustomerInfo() {
	var lpExternalCustomerId = 93301125;
	var newEmailAddress = "jktest20@pacsun.com";
	var firstName = "Jong"; 
	var lastName = "Kim";
	var birthDate = "11-03";
	var shoppingPreference = "Male";
	var addressLine1 = "3037 Softwind way";
	var addressLine2 = null;
	var city = "Torrance";
	var postalCode = "90505";
	var state = "CA";
	var mobilePhone = "3373373347";
	var updateCustomerInfo = require('../customerRequest/UpdateCustomerInfo');
	var response = updateCustomerInfo.run(lpExternalCustomerId, newEmailAddress, firstName, lastName, birthDate, shoppingPreference, addressLine1, addressLine2, city, postalCode, state, mobilePhone);
}

function recordCheckInEvent() {
	var lpExternalCustomerId = "75587003";
	var recordCheckInEvent = require('../event/RecordCheckInEvent');
	var response = recordCheckInEvent.run(lpExternalCustomerId);
	return response;
}

function purchase() {
	var purchase = require('../event/Purchase');
	var lpExternalCustomerId = "94387328"; //jktest25@pacsun.com
	var orderNo = "70039425";
	var response = purchase.run(lpExternalCustomerId, orderNo);
	return response;
}

function returnn() {
	var returnn = require('../event/Return');
	var lpExternalCustomerId = "94387328"; //jktest25@pacsun.com
	var orderNo = "70039425";
	var response = returnn.run(lpExternalCustomerId, orderNo);
	return response;
}

function lookupCustomer() {
	var lookupCustomer = require('../customerRequest/LookupCustomer');
	var emailAddress = "jktest1@pacsun.com";
	var response = lookupCustomer.run(emailAddress);
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

function enrollPOST() {
	var enrollCustomer = require('../customerRequest/EnrollCustomer-POST');
	var emailAddress = "jktest25@pacsun.com";
	var firstName = "jong";
	var lastName = "kim";
	var birthDate = "12-25";
	var shoppingPreference = "Female";
	var preferredStore = null;

	var response = enrollCustomer.run(emailAddress, firstName, lastName, birthDate, shoppingPreference, preferredStore,
			null, null, null, null, null, null);
    return response;
}

function logResponse(response) {
	logger.debug("response: " + JSON.stringify(response));
	return;
}

module.exports.run = run;