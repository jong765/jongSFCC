/**
* Description of the Controller and the logic it provides
*
* @module  controllers/JK_Demo
*/

'use strict';

// HINT: do not put all require statements at the top of the file
// unless you really need them for all functions

/**
* Description of the function
*
* @return {String} The string 'myFunction'
*/

/* Script Modules */
var app = require('sitegenesis_controllers/cartridge/scripts/app');
var guard = require('sitegenesis_controllers/cartridge/scripts/guard');
var ExtendJS = require('JongTest/cartridge/scripts/JK_ExtendJS');

function show()	{
	
	// display isml template
	require('dw/template/ISML').renderTemplate('displayMessage.isml', {	
	 	message: 'Controllers rock!'	
	});	
}	

//normal get request, no post allowed	
exports.Show = guard.ensure(['get'], show);	

