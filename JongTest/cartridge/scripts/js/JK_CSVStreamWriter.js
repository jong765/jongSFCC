'use strict'

var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var CSVStreamWriter = require('dw/io/CSVStreamWriter');
var Logger = require('dw/system/Logger');

function writeToFile(params) {
	var exportFile = new File(File.IMPEX + "/src/mao/availabilityAlert/test.csv");
	try {
		var fileWriter = new FileWriter(exportFile);
		var csvStreamWriter = new CSVStreamWriter(fileWriter, "|", '"');
		csvStreamWriter.writeNext("1", "test@pacsun.com", "dmtest", "accept5", "12/02/2019");
	} catch(e) {
		Logger.error("Unable to complete customer export: "+e.message);
	} finally {
		try {
			if (fileWriter) fileWriter.close();
			if (csvStreamWriter) csvStreamWriter.close();
		} catch(e) {
			//Do nothing
		}
	}
}

module.exports = {
	  'writeToFile': writeToFile
}
