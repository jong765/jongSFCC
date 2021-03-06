'use strict'

/**
 * Controller : OrderDetailReport
 *
 * @module controllers/OrderDetailReport
 */

var ProductMgr = require('dw/catalog/ProductMgr');
var File = require('dw/io/File');
var FileReader = require('dw/io/FileReader');
var CSVStreamReader = require('dw/io/CSVStreamReader');
var FileWriter = require('dw/io/FileWriter');
var CSVStreamWriter = require('dw/io/CSVStreamWriter');
var HashSet = require('dw/util/HashSet');
var Logger = require('dw/system/Logger');

function run(parameters) {
	return handleJob(runReport(parameters));
}

function handleJob(jobResult) {
	if(!jobResult.ok) {
		throw new Error(jobResult.msg || jobResult.errorMessage);
	}
	return jobResult.ok;
}

function runReport(parameters) {
	var result = {"ok" : false};
	var foldername = parameters.folderName;
	var filename = parameters.fileName;
	
	var outputFilename = "FOGOrderDetailReport.csv";
	var exportFile = new File(File.IMPEX + "/src/" + foldername + "/" + outputFilename);
    var fileWriter = null;
    var csvWriter = null;
	
	(new dw.io.File(dw.io.File.IMPEX + File.SEPARATOR + 'src' + File.SEPARATOR + foldername + File.SEPARATOR)).mkdirs();
	
	try {
		inFile = new dw.io.File(dw.io.File.IMPEX + File.SEPARATOR + 'src' + File.SEPARATOR + foldername + File.SEPARATOR + filename);
		
		if(!inFile.exists()) 
		{
			Logger.error("File "+inFile.name+" does not exist!");
			result.ok = false;
		} else {
			result.ok = true;
			var fogSkuSet = loadFogSkus(inFile)
			fileWriter = new FileWriter(exportFile);
			csvWriter = new CSVStreamWriter(fileWriter, parameters.delimiter);
           
			csvWriter.writeNext(["SKU#", "Product Name", "Online", "Allocation", "OnOrder", "ATS", "AlertStatus"]);
			
			
			if (csvWriter) csvWriter.close();
	        if (fileWriter) fileWriter.close();
		}

	} catch (e) {
		var exception = e;
		var errMessage = exception.message + "\n" + exception.stack;
		Logger.error(errMessage);
		result.ok = false;
		if (inReader) inReader.close();
		if (csvWriter) csvWriter.close();
		if (fileWriter) fileWriter.close();
	}

   return result;
}

function loadFogSkus(inFile) {
    var inReader = new CSVStreamReader(new FileReader(inFile), ',', '"');
	var inFile : File;
	var fogSKUs = new HashSet();
	var inReader : CSVStreamReader;
	while (line = inReader.readNext()) {
		if (line.length >= 1) {
			var productId = line[0].replace('\t','');
			fogSKUs.add1(productId);
		}
	}
	if (inReader) inReader.close();
	return fogSKUs;
}

module.exports.run = run;