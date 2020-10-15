'use strict'

function execute(args) {
	var Pipelet = require('dw/system/Pipelet');
	var importFile;
	var importStatus;
	
	var result = new Pipelet('ImportCatalog').execute({
		ImportFile: importFile,
		ImportMode: "MERGE",
		Status: importStatus
    });

    return PIPELET_NEXT;
}

module.exports = {
	'execute': execute
}