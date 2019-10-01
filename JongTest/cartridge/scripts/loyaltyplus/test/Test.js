'use strict'

/**
 * Controller : Test
 *
 * @module controllers/Test
 */

function run() {
	//var response = enrollCustomer();
	//var response = showCustomer();
	//var response = getCustomerEvents();
	var response = updateShoppingPreference();
	//var response = updatePreferredStore();
	//var response = enroll1();
	//var response = getSignature();

	return response.success;
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

function enroll1() {
	var enrollCustomer = require('../customerRequest/EnrollCustomer');
	var emailAddress = "jktest22@pacsun.com";
	var firstName = "jong";
	var lastName = "kim";

	var response = enrollCustomer.run(emailAddress, firstName, lastName, null, null, null,
			null, null, null, null, null, null);
    return response;
}

function getCustomerEvents() {
	var getCustomerEvents = require('../customerRequest/GetCustomerEvents');
	var lpExtCustomerId = "97577177";
	var response = getCustomerEvents.run(lpExtCustomerId, null, null);
	return response;
}

function enrollCustomer() {
	var enrollCustomer = require('../customerRequest/EnrollCustomer');
	var emailAddress = "jktest22@pacsun.com";
	var firstName = "jong"
	var lastName = "kim";
	var birthDate = "03-12";
	var shoppingPreference = "Both";
	var preferredStore = null;
	var addressLine1 = "3450 E Miraloma Ave";
	var addressLine2 = null;
	var city = "Anaheim";
	var postalCode = "92806";
	var state = "CA";
	var mobilePhone = "3733329983";
	var response = enrollCustomer.run(emailAddress, firstName, lastName, birthDate, shoppingPreference, preferredStore,
			addressLine1, addressLine2, city, postalCode, state, mobilePhone);
    return response;
}

function showCustomer() {
	var showCustomer = require('../customerRequest/ShowCustomer');
	var lpExternalCustomerId = "97577177";
	var response = showCustomer.run(lpExternalCustomerId);
	return response;
}

module.exports.run = run;