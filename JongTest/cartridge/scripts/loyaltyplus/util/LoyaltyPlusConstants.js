/**
 *  LoyaltyPlusConstants.js
 *  
 *  Loyalty plus constants	
 */
'use strict';

var Site = require('dw/system/Site');

var UrlPath = {
	COUPON_UPDATE				: "/data/coupon/update",
	CREATE_REFERRAL				: "/api/referral/create",
	CUSTOMER_COUPONS			: "/data/customer/coupons",
	CUSTOMER_EVENTS				: "/data/customer/events",
	CUSTOMER_OFFERS				: "/data/customer/offers",
	CUSTOMER_POINT_RULE_GROUPS	: "/data/customer/point_rule_groups",
	CUSTOMER_SEARCH				: "/data/customers/search",
	CUSTOMER_REWARDS 			: "/data/customer/rewards",
	CUSTOMER_SHOW 				: "/data/customer/show",
	CUSTOMER_ENROLL 			: "/2019-01-01/api/enroll.json",
	PAUSE						: "/api/pause.json",
	POINTS_SHOW					: "/data/points/show",
	POINTS_VALUE				: "/data/points/value",
	REACTIVATE					: "/api/reactivate.json",
	RECORD						: "/api/record.json",
	REFERRAL_CREATE				: "/api/referral/create",
	REJECT						: "/data/event/reject",
	REWARDS 					: "/data/rewards",
	REWARD_REDEEM 				: "/api/reward_redeem.json",
	SET_SUBSCRIPTION_TYPE 		: "/api/set_subscription_type.json",
	UPDATE_CUSTOMER_INFO 		: "/data/customer/update_customer_info",
	UPDATE_EMAIL 				: "/data/customer/update_email",
	UPDATE_ATTRIBUTES 			: "/data/customer/update_attributes"
};

var CustomPreference = {
	ACCOUNT_ID				: Site.current.preferences.custom.lpAccountID,
	SECRET_KEY				: Site.current.preferences.custom.lpSecretKey
};

var EventType = {
	CHECK_IN				:	"checkin",
	COMPLETE_PROFILE		:	"complete_profile",
	LIKE_A_PRODUCT			:	"like_a_product",
	PURCHASE				:	"purchase",
	RETURN					:	"return",
	REVIEW                  :   "review"
};

var Constant = {
	CHANNEL						   : "Online",
	LIKE_PRODUCT_LIMIT_PER_MONTH   : 10
}

module.exports.UrlPath = UrlPath;
module.exports.CustomPreference = CustomPreference;
module.exports.Constant = Constant;
module.exports.EventType = EventType;