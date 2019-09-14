function PromisingRequestDetail() {
	this.Address = {};
	this.ItemId = "";
	this.Quantity = 0;
	this.DeliveryMethodId = "";
	this.PromisingRequestDetailId = "";
	this.ShippingMethodId = "";
}

PromisingRequestDetail.prototype = 
{
	setAddress : function(value){
		this.Address = value;
	},

	getAddress : function(){
		return this.Address;
	},

	setItemId : function(value){
		this.ItemId = value;
	},
		
	getItemId : function(){
		return this.ItemId;
	},

	setQuantity : function(value){
		this.Quantity = value;
	},
		
	getQuantity : function(){
		return this.Quantity;
	},

	setDeliveryMethodId : function(value){
		this.DeliveryMethodId = value;
	},
		
	getDeliveryMethodId : function(){
		return this.DeliveryMethodId;
	},

	setPromisingRequestDetailId : function(value){
		this.PromisingRequestDetailId = value;
	},
		
	getPromisingRequestDetailId : function(){
		return this.PromisingRequestDetailId;
	},

	setShippingMethodId : function(value){
		this.ShippingMethodId = value;
	},
		
	getShippingMethodId : function(){
		return this.ShippingMethodId;
	}
}

module.exports = PromisingRequestDetail;