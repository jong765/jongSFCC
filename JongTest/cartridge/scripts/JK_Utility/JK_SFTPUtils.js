'use strict';

var File = require('dw/io/File');
var ArrayList = require('dw/util/ArrayList');
var SFTPClient = require('dw/net/SFTPClient');
var StringUtils = require('dw/util/StringUtils');
var Logger = require('dw/system/Logger');
var LogUtils = require('~/cartridge/scripts/util/LogUtils');

function sendFile (hostName, userId, password, targetSiteName, remoteFolder, sourceFilePath, remoteFileName) {
	var sftp = new SFTPClient(); 
	sftp.setTimeout(0);
	
	try {
		if(sftp.connect(hostName, 22, userId, password)) {
			Logger.info('Connected to {0} SFTP', targetSiteName);
			
			//var file = new File(File.IMPEX + "/src/" + sourceFilePath);
			if (sourceFilePath.indexOf(File.IMPEX +'/src/') == -1) {
				sourceFilePath = File.IMPEX + "/src/" + sourceFilePath;
			}
			var file = new File(sourceFilePath);
			
			if(!file.exists()) {
				return false;
			} else {
				if (!empty(remoteFolder))
					sftp.cd(remoteFolder);
				var fileTransfer = sftp.putBinary(remoteFileName, file);
				if (!fileTransfer)
					Logger.error("SFTP error: " + sftp.getErrorMessage());
				
				sftp.disconnect();
				
				if(fileTransfer == true) {
					return true;
				}
			}
			return false;		
		} else {
			Logger.error("SFTP error: " + sftp.getErrorMessage());
		}
	} catch(e) {
		LogUtils.logError(e);
		return false;
	}
	return false;
}

function receiveFiles (host, user, password, localFileFolder, remoteFileFolder, remoteFilePrefix, remoteArchiveFileFolder) {
	var returnFiles = new ArrayList();
	try {
		if (remoteFileFolder == null || remoteFileFolder.length == 0)
			throw new Error(StringUtils.format("remoteFileFolder is not defined:{0}", remoteFileFolder));
		
		if (empty(host) || empty(user) || empty(password))
			throw new Error(StringUtils.format("Missing SFTP credentials: host={0}, user={1}, password={2}", host, user, password));
		
		var ftp = new SFTPClient();
		ftp.connect(host, 22, user, password);
		
		if(!ftp.connected)
			throw new Error(StringUtils.format("Unable to connect to ftp server:{0}", host));

		ftp.cd(remoteFileFolder);

		// Get a list of all files from the file path
		var fileList = ftp.list();

		fileList.forEach(function(file){
			if (file.name.indexOf(remoteFilePrefix) != -1) {
				downloadFile(ftp, file.name, localFileFolder);
				returnFiles.push(file.name);
				// archive file
				if (remoteArchiveFileFolder) {
					var archiveFilePath = remoteFileFolder+"/"+remoteArchiveFileFolder+"/"+file.name;
					ftp.rename(file.name, archiveFilePath);
				}
			}
		});
	} catch (e) {
		var exception = e;
		LogUtils.logError(e);
		throw new Error(StringUtils.format("Error occurred when receiving files through FTP"));
	}

	returnFiles.sort();
   return returnFiles;
}

function receiveFile (host, user, password, localFileFolder, remoteFileFolder, remoteFilePrefix, remoteArchiveFileFolder) {
	var returnFile = null;
	try {
		if (remoteFileFolder == null || remoteFileFolder.length == 0)
			throw new Error(StringUtils.format("remoteFileFolder is not defined:{0}", remoteFileFolder));
		
		if (empty(host) || empty(user) || empty(password))
			throw new Error(StringUtils.format("Missing SFTP credentials: host={0}, user={1}, password={2}", host, user, password));
		
		var ftp = new SFTPClient();
		ftp.connect(host, 22, user, password);
		
		if(!ftp.connected)
			throw new Error(StringUtils.format("Unable to connect to ftp server:{0}", host));

		ftp.cd(remoteFileFolder);

		// Get a list of all files from the file path
		var fileList = ftp.list();
		
		if(!empty(fileList))
		{
			for(var i=0;i<fileList.length;i++)
			{
				fileName = fileList[i].getName();
				if (fileName.indexOf(remoteFilePrefix) != -1) {
					downloadFile(ftp, fileName, localFileFolder);
					returnFile = fileName;
					// archive file
					if (remoteArchiveFileFolder) {
						var archiveFilePath = remoteFileFolder+"/"+remoteArchiveFileFolder+"/"+fileName;
						ftp.rename(fileName, archiveFilePath);
					} else {
						ftp.del(fileName);
					}
					break;
				}
			}
		}
	} catch (e) {
		var exception = e;
		LogUtils.logError(e);
		throw new Error(StringUtils.format("Error occurred when receiving files through FTP"));
	}

   return returnFile;
}

function downloadFile(ftp, remoteFileName, localFileFolder) {
	var localDirectory = new File(localFileFolder);
	if(!localDirectory.exists())
		localDirectory.mkdirs();
	
	var localFile = new File(localDirectory, remoteFileName);
	if(ftp.getBinary(remoteFileName, localFile))
		return true;
	else
		return false;		
} 

module.exports = {
    'sendFile': sendFile,
    'receiveFiles': receiveFiles,
    'receiveFile': receiveFile
}