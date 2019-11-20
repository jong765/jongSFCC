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

var externalCustomerId = "87464141";
var emailAddress = "jktest3@pacsun.com";
var shoppingPreference = "Both";
var acceptedTermsConditions = true;
var preferredStore = "0055";
var order = OrderMgr.getOrder("70039825");

function run() {
	//var response = calculateProformaPoints();
	//var response = updateCoupon();
	var response = GetCustomerOffers();
	//var response = GetRedeemedCustomerCoupons();
	//var response = lookupCustomer();
	//var response = enrollCustomer();
	//var response = showCustomer();
	//var response = updateCustomerInfo();
	//var response = getCustomerEvents();
	//var response = getCustomerPointRuleGroups();
	//var response = pauseCustomer();
	//var response = reactivateCustomer();
	//var response = checkIn();
	//var response = completeProfile();
	//var response = purchase();
	//var response = rejectPurchase();
	//var response = returnn();
	//var response = recordCheckInEvent();
	//var response = likeProduct();
	//var response = postReview();
	//var response = updateShoppingPreference();
	//var response = updateTermsConditions();
	//var response = updatePreferredStore();
	//var response = getSignature();
	//var response = testDate();
	//var response = formatDate();
	//var response = getProduct();

	logResponse(response);
	return true;
}

function calculateProformaPoints() {
	var calculateProformaPoints = require('../rewards/CalculateProformaPoints');
	var response = calculateProformaPoints.run(order);
	return response;
}

function GetCustomerOffers() {
	var getCustomerOffers = require('../rewards/GetCustomerOffers');
	var response = getCustomerOffers.run(externalCustomerId);
	return response;
}

function GetRedeemedCustomerCoupons() {
	var getRedeemedCoupons = require('../rewards/GetRedeemedCustomerCoupons');
	var response = getRedeemedCoupons.run(externalCustomerId);
	return response;
}

function formatDate() {
	//var response = DateUtil.formatDate(new Date, "yyyy-MM-dd'T'HH:MM:ss");
	var response = DateUtil.formatDate(new Date, "yyyyMMddhhmmss");
	return response;
}

function lookupCustomer() {
	var lookupCustomer = require('../customerRequest/LookupCustomer');
	var response = lookupCustomer.run(emailAddress);
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

function updateCoupon() {
	var updateCoupon = require('../rewards/UpdateCoupon');
	var code = "LPReward10_13269016126181398563";
	var status = "used";
	var response = updateCoupon.run(code, status);
	return response;
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

function postReview() {
	var marketingId = "DSK";
	var postReview = require('../event/PostReview');
	var response = postReview.run(externalCustomerId, marketingId);
	return response;
}

function likeProduct() {
	var productId = "8872234";
	var marketingId = "DSK";
	var LikeProduct = require('../event/LikeProduct');
	var response = LikeProduct.run(externalCustomerId, productId, marketingId);
	return response;
}

function checkIn() {
	var marketingId = "DSK";
	var checkIn = require('../event/CheckIn');
	var response = checkIn.run(externalCustomerId, marketingId);
	return response;
}

function reactivateCustomer() {
	var reactivateCustomer = require('../customerRequest/ReactivateCustomer');
	var response = reactivateCustomer.run(externalCustomerId);
	return response;
}

function pauseCustomer() {
	var pauseCustomer = require('../customerRequest/PauseCustomer');
	var response = pauseCustomer.run(externalCustomerId);
	return response;
}

function rejectPurchase() {
	var rejectPurchase = require('../event/RejectPurchase');
	var orderNo = "70039826";
	var response = rejectPurchase.run(externalCustomerId, orderNo);
	return response;
}

function purchase() {
	var purchase = require('../event/Purchase');
	var orderNo = "70039826";
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
	var response = completeProfile.run(lpExternalCustomerId, emailAddress, firstName, lastName, birthDate, postalCode, shoppingPreference, marketingId);
	return response;
}

function formatDateString() {
	var dateString = "2019-10-04T16:07:21-0700";
	//var dateString = "2019/10/04 16:07:21-0700";
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
	return signature; //1b9ca3c20db0dc265de93478481ae97f
}

function updateShoppingPreference() {
	var updateShoppingPreference = require('../customerRequest/UpdateShoppingPreference');

	var response = updateShoppingPreference.run(externalCustomerId, shoppingPreference);
    return response;
}

function updateTermsConditions() {
	var updateTermsConditions = require('../customerRequest/UpdateTermsConditions');

	var response = updateTermsConditions.run(externalCustomerId, acceptedTermsConditions);
    return response;
}

function updatePreferredStore() {
	var updateShoppingPreference = require('../customerRequest/UpdatePreferredStore');

	var response = updateShoppingPreference.run(externalCustomerId, preferredStore);
    return response;
}

function getProduct() {
	var ProductMgr = require('dw/catalog/ProductMgr');
	var productId = "8544645";
	var product = ProductMgr.getProduct(productId);
	var response = {"classCode":product.custom.classCode};
	return response;
}

function logResponse(response) {
	logger.debug("response: " + JSON.stringify(response));
	return;
}

module.exports.run = run;