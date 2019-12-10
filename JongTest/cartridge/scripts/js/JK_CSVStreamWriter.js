'use strict'

var File = require('dw/io/File');
var CSVStreamWriter = require('dw.io.CSVStreamWriter
var Logger = require('dw/system/Logger');

function writeToFile(params) {
	var exportFile = new File(File.IMPEX + "/src/mao/availabilityAlert/test.csv");
	try {
		var writer = new CSVStreamWriter(exportFile, "|", '"');
		if (!exportFile.exists()) {
			writer.writeNext("ID", "EMAIL", "FIRSTNAME", "LASTNAME", "LASTLOGIN");
		}
		writer.writeNext("1", "test@pacsun.com", "dmtest", "accept5", "12/01/2019");
	} catch(e) {
		Logger.error("Unable to complete customer export: "+e.message);
	} finally {
		if (writer) writer.close();
	}
}

module.exports = {
	  'writeToFile': writeToFile
}
