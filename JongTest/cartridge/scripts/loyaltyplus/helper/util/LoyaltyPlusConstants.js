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
	CUSTOMER_ENROLL 			: "/2019-01-01/api/enroll.json",
	CUSTOMER_OFFERS				: "/data/customer/offers",
	CUSTOMER_POINT_RULE_GROUPS	: "/data/customer/point_rule_groups",
	CUSTOMER_REWARDS 			: "/data/customer/rewards",
	CUSTOMER_SEARCH				: "/data/customers/search",
	CUSTOMER_SHOW 				: "/data/customer/show",
	PAUSE						: "/api/pause.json",
	POINTS_SHOW					: "/data/points/show",
	POINTS_VALUE				: "/data/points/value",
	REACTIVATE					: "/api/reactivate.json",
	RECORD						: "/api/record.json",
	REJECT						: "/data/event/reject",
	REWARDS 					: "/data/rewards",
	REWARD_REDEEM 				: "/api/reward_redeem.json",
	UPDATE_ATTRIBUTES 			: "/data/customer/update_attributes",
	UPDATE_CUSTOMER_INFO 		: "/data/customer/update_customer_info",
	UPDATE_EMAIL 				: "/data/customer/update_email"
};

var CustomPreference = {
	LP_ENABLED              : Site.current.preferences.custom.lpEnabled,
	ACCOUNT_ID				: Site.current.preferences.custom.lpAccountID,
	SECRET_KEY				: Site.current.preferences.custom.lpSecretKey
};

var EventType = {
	CHECK_IN				:	"log_into_loyalty",
	COMPLETE_PROFILE		:	"complete_profile",
	LIKE_A_PRODUCT			:	"like_a_product",
	PURCHASE				:	"purchase",
	RETURN					:	"return",
	REVIEW                  :   "review"
};

var Constant = {
	CHANNEL		: "Online"
}

module.exports.UrlPath = UrlPath;
module.exports.CustomPreference = CustomPreference;
module.exports.EventType = EventType;
module.exports.Constant = Constant;