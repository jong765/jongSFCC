var Site = require('dw/system/Site');

var UrlPath = {
	ENROLL 					: "/api/enroll.json",
	REWARD_REDEEM 			: "/api/reward_redeem.json",
	SET_SUBSCRIPTION_TYPE 	: "/api/set_subscription_type.json",
	UPDATE_CUSTOMER_INFO 	: "/data/customer/update_customer_info",
	UPDATE_EMAIL 			: "/data/customer/update_email",
	UPDATE_ATTRIBUTES 		: "/data/customer/update_attributes",
	CUSTOMER_REWARDS 		: "/data/customer/rewards",
	CUSTOMER_SHOW 			: "/data/customer/show",
	REWARDS 				: "/data/rewards",
	TIERS 					: "/data/tiers"
}

var CustomPreference = {
	SECRET_KEY				: Site.current.preferences.custom.lpSecretKey;	
}

module.exports.UrlPath = UrlPath;
module.exports.CustomPreference = CustomPreference;