'use strict'

/**
 * Controller : FOGOrderDetailReport
 *
 * @module controllers/FOGOrderDetailReport
 */

 var OrderMgr = require('dw/order/OrderMgr');
 var File = require('dw/io/File');
 var FileReader = require('dw/io/FileReader');
 var CSVStreamReader = require('dw/io/CSVStreamReader');
 var FileWriter = require('dw/io/FileWriter');
 var CSVStreamWriter = require('dw/io/CSVStreamWriter');
 var Calendar = require('dw/util/Calendar');
 var StringUtils = require('dw/util/StringUtils');

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
	var inReader : CSVStreamReader;
	var inFile : File;
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
			inReader = new CSVStreamReader(new FileReader(inFile), ',', '"',1);
			fileWriter = new FileWriter(exportFile);
            csvWriter = new CSVStreamWriter(fileWriter, ",");
            
            csvWriter.writeNext(["Order Number", "Order Date", "Order Time","SKU#", "Item Description", "Quantity", "Customer Name", "Customer Email", "Order Total", "Status", "Export Status"]);
			
			while (line = inReader.readNext()) {
				if (line.length >= 1) {
					var orderId = line[0].replace('\t','');
					var order = OrderMgr.getOrder(orderId);
					var sku = pad(line[4].replace('\t',''),7);
					var customerName = order.customerName;
				    var customerEmail = order.customerEmail;
				    var orderTotal = order.totalGrossPrice;
				    var orderStatus = order.status.displayValue;
				    var orderDate = getOrderDateTime(order.creationDate).date;
				    var orderTime = getOrderDateTime(order.creationDate).time;
				    var productLineItems = order.productLineItems;
				    var itemQuantityDescription = getItemQuantityDescription(productLineItems,sku);
				    var quantity = itemQuantityDescription.quantity;
				    var itemDescription = itemQuantityDescription.itemDescription;
				    var exportStatus = order.exportStatus.displayValue;
					var test = 1;
					if (!empty(order)) {
						csvWriter.writeNext([orderId, orderDate, orderTime, sku, itemDescription, quantity, customerName, customerEmail, orderTotal, orderStatus, exportStatus]);
					} else {
						csvWriter.writeNext([orderId, "Order not found."]);
					}
					fileWriter.flush();
				}	
			}
			if (inReader) inReader.close();
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

function getItemQuantityDescription(productLineItems,sku) {
	var returnObject = {};
	for (var i in productLineItems) {
		var productLineItem = productLineItems[i];
		var productId = productLineItem.productID;
		if (productId == sku) {
			returnObject.quantity = productLineItem.quantityValue;
			returnObject.itemDescription = productLineItem.lineItemText;
			break;
		}
	}
	return returnObject;
}

function getOrderDateTime(orderDate) {
	var orderDateTime = {};
    var orderCalendar = new Calendar(orderDate);
    orderCalendar.timeZone = "PST";
    orderDateTime.date = StringUtils.formatCalendar(orderCalendar, "MM/dd/yyyy");
    orderDateTime.time = StringUtils.formatCalendar(orderCalendar, "hh:mm a");
    return orderDateTime;
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

module.exports.run = run;