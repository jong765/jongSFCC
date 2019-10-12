/********************************************************************************************
 *  CompleteProfile.js
 * 
 *  Record Complete_profile event if the customer completes the following required fields:
 *  	firstName, lastName, emailAddress, postalCode, birthDate, shoppingPreference
 *
 *   @input lpExternalCustomerId : String
 *   @input emailAddress : String
 *   @input firstName : String
 *   @input lastName : String
 *   @input birthDate : String
 *   @input postalCode: String
 *   @input shoppingPreference : String
 *   @input marketingId : String
 *   @output responseObject : Object
 */

var GetCustomerEvents = require('../customerRequest/GetCustomerEvents');
var RecordEventService = require('../service/RecordEventService');
var RecordRequestParam = require('../model/RecordRequestParam');
var EventType = require('../util/LoyaltyPlusConstants').EventType;
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "CompleteProfile.js");

function execute(args) {
	var responseObject = run(args.lpExternalCustomerId, args.emailAddress, args.firstName, args.lastName, args.birthDate, args.postalCode, args.shoppingPreference, args.marketingId);
    args.responseObject = responseObject;
    return result.responseObject ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(lpExternalCustomerId, emailAddress, firstName, lastName, birthDate, postalCode, shoppingPreference, marketingId) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'lpExternalCustomerId':lpExternalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        if (isProfileComplete(emailAddress, firstName, lastName, birthDate, postalCode, shoppingPreference) &&
    		!isProfileCompleteInLP(lpExternalCustomerId)) {
    		responseObject = recordEvent(lpExternalCustomerId, marketingId);
        } else {
        	responseObject = {success : true};
        } 
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        responseObject = {success : false};
    }
    logger.debug("responseObject: " + JSON.stringify(responseObject));
    return responseObject;
}

function recordEvent(lpExternalCustomerId, marketingId) {
    var responseObject = {};
    var type = EventType.COMPLETE_PROFILE;
    try {
        var result = RecordEventService.run(new RecordRequestParam(lpExternalCustomerId, type, marketingId)).object;
        var data = result.data;
        if (data) {
            responseObject = {success : result.success,
                              points : data.points,
                              eventId : data.id};
        } else {
            responseObject = {success : false};
        }
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        responseObject = {success : false};
    }
    return responseObject;
}

function isProfileComplete(emailAddress, firstName, lastName, birthDate, postalCode, shoppingPreference) {
	var profileComplete = false;
	try {
		profileComplete = empty(emailAddress) || empty(firstName) || empty(lastName) || empty(birthDate) ||
			empty(postalCode) || empty(shoppingPreference) ? false : true;
		logger.debug("profileComplete: " + profileComplete);
	} catch(e) {
		var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
	}
	return profileComplete;
}

function isProfileCompleteInLP(lpExternalCustomerId) {
	var profileCompleteInLP = true;
	try {
		var eventType = "complete_profile";
		var dateFilter = null;
		var afterDate = null;
		var response = GetCustomerEvents.run(lpExternalCustomerId, eventType, dateFilter, afterDate, null, null);
		profileCompleteInLP = response.data.length > 0;
	} catch(e) {
		var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
	}
	logger.debug("isProfileCompleteInLP: " + profileCompleteInLP);
	return profileCompleteInLP;
}

function getCustomerInfo(lpExternalCustomerId, newEmailAddress, firstName, lastName, birthDate, shoppingPreference, addressLine1, addressLine2, city, postalCode, state, mobilePhone) {
	var customerInfo = new CustomerInfo();
	customerInfo.externalCustomerId = lpExternalCustomerId;
	customerInfo.setNewEmailAddress(newEmailAddress);
	customerInfo.firstName = firstName;
	customerInfo.lastName = lastName;
	customerInfo.birthDate = birthDate;
	customerInfo.shoppingPreference = shoppingPreference;
	customerInfo.mobilePhone = mobilePhone;
	var address = new Address();
	address.addressLine1 = addressLine1;
	address.addressLine2 = addressLine2;
	address.city = city;
	address.postalCode = postalCode;
	address.state = state;
	customerInfo.address = address;
	return customerInfo;
}

module.exports = {
    'execute': execute,
    'run': run
}