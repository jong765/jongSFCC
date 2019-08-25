'use strict';

var Site = require('dw/system/Site');

var UrlPath = {
	APPROVE                 : "/data/event/approve",
	CREATE_REFERRAL			: "/api/referral/create",
	CUSTOMER_SEARCH			: "/data/customers/search",
	CUSTOMER_REWARDS 		: "/data/customer/rewards",
	CUSTOMER_SHOW 			: "/data/customer/show",
	ENROLL 					: "/api/enroll.json",
	PING					: "/api/ping",
	POINTS_VALUE			: "/data/points/value",
	RECORD					: "/api/record.json",
	REJECT					: "/data/event/reject",
	REWARDS 				: "/data/rewards",
	REWARD_REDEEM 			: "/api/reward_redeem.json",
	SET_SUBSCRIPTION_TYPE 	: "/api/set_subscription_type.json",
	UPDATE_CUSTOMER_INFO 	: "/data/customer/update_customer_info",
	UPDATE_EMAIL 			: "/data/customer/update_email",
	UPDATE_ATTRIBUTES 		: "/data/customer/update_attributes"
};

var CustomPreference = {
	ACCOUNT_ID				: Site.current.preferences.custom.lpAccountID,
	SECRET_KEY				: Site.current.preferences.custom.lpSecretKey
};

var Constant = {
	CHANNEL					: "Online"	
}

module.exports.UrlPath = UrlPath;
module.exports.CustomPreference = CustomPreference;
