'use strict'

/**
 * Controller : Test
 * 
 * @module controllers/Test
 */
var OrderMgr = require('dw/order/OrderMgr');
var Util = require('../helper/util/Util');
var DateUtil = require('../helper/util/DateUtil');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-test", "Test.js");

function run() {
	//var response = enrollCustomer();
	// var response = lookupCustomer();
	// var response = showCustomer();
	// var response = updateCustomerInfo();
	// var response = pauseCustomer();
	// var response = reactivateCustomer();
	// var response = getCustomerEvents();
	// var response = getCustomerPointRuleGroups();
	// var response = getCustomerCoupons();
	 var response = getUsedAwardAmount(); 
	// var response = GetCustomerOffers();
	// var response = calculateProformaPoints();
	// var response = logIntoLoyalty();
	// var response = updatePreferredStore();
	// var response = updateShoppingPreference();
	// var response = updateTermsConditions();
	// var response = updateCoupon();
	// var response = completeProfile();
	// var response = purchase();
	// var response = rejectPurchase();
	// var response = returnn();
	// var response = recordCheckInEvent();
	// var response = likeProduct();
	// var response = postReview();
	// var response = getSignature();
	// var response = testDate();
	// var response = formatDate();
	// var response = getProduct();

	logResponse(response);
	return true;
}

function getUsedAwardAmount() {
	var getUsedAwardAmount = require('../rewards/GetUsedAwardAmount');
	var externalCustomerId = "93301125";
	var numberOfDays = 30;
	var response = getUsedAwardAmount.run(externalCustomerId, numberOfDays);
	var usedAwardAmount = response.data.usedAwardAmount;
	return response;
}

function enrollCustomer() {
	var enrollCustomer = require('../customerRequest/EnrollCustomer');
	var emailAddress = "jktest61@pacsun.com";
	var firstName = "Jong"
	var lastName = "Kim";
	var birthDate = "0116";
	var addressLine1 = "3450 E Miraloma Ave";
	var addressLine2 = null;
	var city = "Anaheim";
	var postalCode = "92806";
	var state = "CA";
	var mobilePhone = "1112223333";
	var shoppingPreference = "Male";
	var acceptedTermsConditions = true;
	var marketingId = "DSK";
	var response = enrollCustomer.run(emailAddress, firstName, lastName, birthDate, addressLine1,
			addressLine2, city, state, postalCode, mobilePhone, shoppingPreference, marketingId,
			acceptedTermsConditions);

	return response;
}

function lookupCustomer() {
	var lookupCustomer = require('../customerRequest/LookupCustomer');
	var emailAddress = "jktest20@pacsun.com";
	var response = lookupCustomer.run(emailAddress);
	return response;
}

function showCustomer() {
	var showCustomer = require('../customerRequest/ShowCustomer');
	var emailAddress = "jktest20@pacsun.com";
	var externalCustomerId = "";
	var include = "coupons,member_attributes";
	var response = showCustomer.run(externalCustomerId, emailAddress, include);
	return response;
}

function updateCustomerInfo() {
	var externalCustomerId = "81307884";
	var emailAddress = "";
	var firstName = "Jong";
	var lastName = "Kim";
	var birthDate = "0101";
	var shoppingPreference = "Female";
	var addressLine1 = "3030 Softwind way";
	var addressLine2 = null;
	var city = "Torrance";
	var postalCode = "90506";
	var state = "CA";
	var mobilePhone = "1112223333";
	var acceptedTermsConditions = false;
	var newEmailAddress = null;
	var updateCustomerInfo = require('../customerRequest/UpdateCustomerInfo');
	var response = updateCustomerInfo.run(externalCustomerId, emailAddress, firstName, lastName,
			birthDate, addressLine1, addressLine2, city, state, postalCode, mobilePhone,
			shoppingPreference, acceptedTermsConditions, newEmailAddress);
	return response;
}

function pauseCustomer() {
	var pauseCustomer = require('../customerRequest/PauseCustomer');
	var externalCustomerId = "93301125";
	var emailAddress = null;
	var response = pauseCustomer.run(externalCustomerId, emailAddress);
	return response;
}

function reactivateCustomer() {
	var reactivateCustomer = require('../customerRequest/ReactivateCustomer');
	var externalCustomerId = null;
	var emailAddress = "jktest20@pacsun.com";
	var response = reactivateCustomer.run(externalCustomerId, emailAddress);
	return response;
}

function getCustomerEvents() {
	var getCustomerEvents = require('../customerRequest/GetCustomerEvents');
	var externalCustomerId = "93301125";
	var emailAddress = "";
	var eventType = "log_into_loyalty";
	var afterDate = null;
	var beforeDate = null;
	var dateFilter = null;
	var pageNumber = null;
	var entriesPerPage = null;
	var response = getCustomerEvents.run(externalCustomerId, emailAddress, eventType, afterDate,
			beforeDate, dateFilter, pageNumber, entriesPerPage);
	return response;
}

function getCustomerPointRuleGroups() {
	var getCustomerPointRuleGroups = require('../customerRequest/GetCustomerPointRuleGroups');
	var externalCustomerId = "93301125";
	var emailAddress = "";
	var response = getCustomerPointRuleGroups.run(externalCustomerId, emailAddress);
	return response;
}

function getCustomerCoupons() {
	var getCustomerCoupons = require('../rewards/GetCustomerCoupons');
	var externalCustomerId = "";
	var emailAddress = "jktest20@pacsun.com";
	var status = "used";
	var response = getCustomerCoupons.run(externalCustomerId, emailAddress, status);
	return response;
}

function GetCustomerOffers() {
	var getCustomerOffers = require('../rewards/GetCustomerOffers');
	var externalCustomerId = "";
	var emailAddress = "jktest20@pacsun.com";
	var response = getCustomerOffers.run(externalCustomerId, emailAddress);
	return response;
}

function calculateProformaPoints() {
	var calculateProformaPoints = require('../rewards/CalculateProformaPoints');
	var order = OrderMgr.getOrder("70040925");
	var response = calculateProformaPoints.run(order);
	return response;
}

function logIntoLoyalty() {
	var externalCustomerId = "93301125";
	var marketingId = "DSK";
	var logIntoLoyalty = require('../event/LogIntoLoyalty');
	var response = logIntoLoyalty.run(externalCustomerId, marketingId);
	return response;
}

function updatePreferredStore() {
	var updateShoppingPreference = require('../customerRequest/UpdatePreferredStore');
	var externalCustomerId = null;
	var emailAddress = "jktest20@pacsun.com";
	var preferredStore = "0075";
	var response = updateShoppingPreference.run(externalCustomerId, emailAddress, preferredStore);
	return response;
}

function updateShoppingPreference() {
	var updateShoppingPreference = require('../customerRequest/UpdateShoppingPreference');
	var externalCustomerId = "93301125";
	var emailAddress = "";
	var shoppingPreference = "Male";
	var response = updateShoppingPreference.run(externalCustomerId, emailAddress,
			shoppingPreference);
	return response;
}

function updateTermsConditions() {
	var updateTermsConditions = require('../customerRequest/UpdateTermsConditions');
	var externalCustomerId = "93301125";
	var emailAddress = "";
	var acceptedTermsConditions = true;
	var response = updateTermsConditions.run(externalCustomerId, emailAddress,
			acceptedTermsConditions);
	return response;
}

function formatDate() {
	// var response = DateUtil.formatDate(new Date, "yyyy-MM-dd'T'HH:MM:ss");
	var response = DateUtil.formatDate(new Date, "yyyyMMddhhmmss");
	return response;
}

function updateCoupon() {
	var updateCoupon = require('../rewards/UpdateCoupon');
	var code = "LPReward10_13269016126181398563";
	var status = "used";
	var response = updateCoupon.run(code, status);
	return response;
}

function postReview() {
	var marketingId = "DSK";
	var postReview = require('../event/PostReview');
	var response = postReview.run(externalCustomerId, marketingId);
	return response;
}

function likeProduct() {
	var externalCustomerId = "93301125";
	var productId = "8872234";
	var marketingId = "DSK";
	var LikeProduct = require('../event/LikeProduct');
	var response = LikeProduct.run(externalCustomerId, productId, marketingId);
	return response;
}

function rejectPurchase() {
	var rejectPurchase = require('../event/RejectPurchase');
	var externalCustomerId = "93301125";
	var orderNo = "70041126";
	var response = rejectPurchase.run(externalCustomerId, orderNo);
	return response;
}

function purchase() {
	var purchase = require('../event/Purchase');
	var externalCustomerId = "93301125";
	var orderNo = "70041126";
	var response = purchase.run(externalCustomerId, orderNo);
	return response;
}

function returnn() {
	var returnn = require('../event/Return');
	var orderNo = "70039826";
	var response = returnn.run(lpExternalCustomerId, orderNo);
	return response;
}

function completeProfile() {
	var firstName = "Jong";
	var lastName = "Kim";
	var birthDate = "0803";
	var postalCode = "92806";
	var shoppingPreference = "Both";
	var marketingId = "DSK";
	var completeProfile = require('../event/CompleteProfile');
	var response = completeProfile.run(lpExternalCustomerId, emailAddress, firstName, lastName,
			birthDate, postalCode, shoppingPreference, marketingId);
	return response;
}

function formatDateString() {
	var dateString = "2019-10-04T16:07:21-0700";
	// var dateString = "2019/10/04 16:07:21-0700";
	var dateFormat = "MM/dd/yyyy HH:MM:ss";
	var response = DateUtil.formatDate(dateString, dateFormat);
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
	return signature; // 1b9ca3c20db0dc265de93478481ae97f
}

function getProduct() {
	var ProductMgr = require('dw/catalog/ProductMgr');
	var productId = "8544645";
	var product = ProductMgr.getProduct(productId);
	var response = {
		"classCode" : product.custom.classCode
	};
	return response;
}

function logResponse(response) {
	logger.debug("response: " + JSON.stringify(response));
	return;
}

module.exports.run = run;