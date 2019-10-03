'use strict'

/**
 * Controller : Test
 *
 * @module controllers/Test
 */

var logger = require('dw/system/Logger').getLogger("loyaltyplus-test", "Test.js");

function run() {
	//var response = enrollCustomer();
	//var response = updateCustomerInfo();
	//var response = lookupCustomer();
	//var response = showCustomer();
	//var response = recordPurchaseEvent();
	var response = recordReturnEvent();
	//var response = getCustomerEvents();
	//var response = updateShoppingPreference();
	//var response = updatePreferredStore();
	//var response = enrollPOST();
	//var response = getSignature();

	logResponse(response);
	return true;
}

function recordPurchaseEvent() {
	var recordPurchaseEvent = require('../event/RecordPurchaseEvent');
	var lpExternalCustomerId = "75587003";
	var orderNo = "70038826";
	var response = recordPurchaseEvent.run(lpExternalCustomerId, orderNo);
	return response;
}

function recordReturnEvent() {
	var recordReturnEvent = require('../event/RecordReturnEvent');
	var lpExternalCustomerId = "75587003";
	var orderNo = "70038826";
	var response = recordReturnEvent.run(lpExternalCustomerId, orderNo);
	return response;
}

function lookupCustomer() {
	var lookupCustomer = require('../customerRequest/LookupCustomer');
	var emailAddress = "jktest1@pacsun.com";
	var response = lookupCustomer.run(emailAddress);
}

function updateCustomerInfo() {
	var lpExternalCustomerId = 93301125;
	var emailAddress = null;
	var firstName = "Jong"; 
	var lastName = "Kim";
	var birthDate = "12-25";
	var shoppingPreference = "Both";
	var addressLine1 = "3450 E Miraloma Ave";
	var addressLine2 = null;
	var city = null;
	var postalCode = null;
	var state = null;
	var mobilePhone = "1112223333";
	var updateCustomerInfo = require('../customerRequest/UpdateCustomerInfo');
	var response = updateCustomerInfo.run(lpExternalCustomerId, emailAddress, firstName, lastName, birthDate, shoppingPreference, addressLine1, addressLine2, city, postalCode, state, mobilePhone);
}

function enrollCustomer() {
	var enrollCustomer = require('../customerRequest/EnrollCustomer');
	var emailAddress = "jktest27@pacsun.com";
	var firstName = "Jong"
	var lastName = "Kim";
	var birthDate = "04-17";
	var shoppingPreference = "Both";
	var preferredStore = null;
	var addressLine1 = "3450 E Miraloma Ave";
	var addressLine2 = null;
	var city = "Anaheim";
	var postalCode = "92806";
	var state = "CA";
	var mobilePhone = "3733329983";
	var marketingId = "MOB";
	var response = enrollCustomer.run(emailAddress, firstName, lastName, birthDate, shoppingPreference, preferredStore,
			addressLine1, addressLine2, city, postalCode, state, mobilePhone, marketingId);

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

function getCustomerEvents() {
	var getCustomerEvents = require('../customerRequest/GetCustomerEvents');
	var lpExtCustomerId = "97577177";
	var response = getCustomerEvents.run(lpExtCustomerId, null, null);
	return response;
}

function showCustomer() {
	var showCustomer = require('../customerRequest/ShowCustomer');
	var lpExternalCustomerId = "75587003";
	var response = showCustomer.run(lpExternalCustomerId);
	return response;
}

function logResponse(response) {
	logger.debug("response: " + JSON.stringify(response));
	return;
}

module.exports.run = run;