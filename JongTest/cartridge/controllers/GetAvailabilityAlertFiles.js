'use strict'

/**
 * Controller : GetAvailabilityAlertFiles
 *
 * @module controllers/GetAvailabilityAlertFiles
 */
importPackage( dw.system );
importPackage( dw.svc );
importPackage( dw.util );
importPackage( dw.io );
importPackage( dw.catalog );

var SFTPUtils = require('int_pacsun/cartridge/scripts/util/SFTPUtils');
var LogUtils = require('int_pacsun_api/cartridge/scripts/mao/util/LogUtils');

function start(parameters) {
    var host : String = "exttransfer.pacsun.com";
    var user : String = "svc_ps_dwprd";
    var password : String = "TLzk@934*uJH";
    var remoteFileFolder : String = "/mulesoft/ps/dw/in/AvailabilityAlert/archive/";
	var remoteFilePrefix : String = "AvailabilityAlert_2019-09-27";
    var localFileFolder : String = File.IMPEX + "/src/mao/availabilityAlert";
    var remoteArchiveFileFolder : String = "archive";
    var result : Object = {"ok" : false};

    try {
		var fileList = SFTPUtils.receiveFiles(host, user, password, localFileFolder, remoteFileFolder, remoteFilePrefix, remoteArchiveFileFolder);
		if (fileList.size() > 0) {
			importAlert(fileList, localFileFolder);
		}
	} catch (ex){
		var exception = ex;
        var errMessage = exception.message + "\n" + exception.stack;
        Logger.error(errMessage);
		result.ok = false;
        return result;
	}
    
    result.ok = true;
    return result;
}

function importAlert(fileList : ArrayList, localFileFolder : String) {
    var fileIter : Iterator = fileList.iterator();

    while (fileIter.hasNext()) {
        var alertFile : File = new File(localFileFolder + File.SEPARATOR + fileIter.next());
    } 
    if (alertCSVReader) alertCSVReader.close();
}

module.exports = {
    'start': start
}