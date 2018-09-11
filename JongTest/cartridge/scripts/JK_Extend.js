/**
* Script file for use in the Script pipelet node.
* To define input and output parameters, create entries of the form:
*
* @<paramUsageType> <paramName> : <paramDataType> [<paramComment>]
*
* where
*   <paramUsageType> can be either 'input' or 'output'
*   <paramName> can be any valid parameter name
*   <paramDataType> identifies the type of the parameter
*   <paramComment> is an optional comment
*
* For example:
*
*-   @input ExampleIn : String This is a sample comment.
*-   @output ExampleOut : Number
*
*/

var Class = require('sitegenesis_controllers/cartridge/scripts/util/Class').Class;

var MyClass = Class.extend({
	
	variable1 : null,
	variable2 : null,
      
    addVariable : function() {
    	return this.variable1 + this.variable2;
    },

	setVariable1 : function(variable1) {
		this.variable1 = variable1;
	},

	setVariable2 : function(variable2) {
		this.variable2 = variable2;
	}
});

module.exports = MyClass;