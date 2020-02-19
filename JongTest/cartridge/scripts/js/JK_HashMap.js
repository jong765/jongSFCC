var HashMap = require('dw/util/HashMap');

function execute(args) {
    var hashMap = new HashMap();
    hashMap.put("1","a");
    hashMap.put("2", "b");
    iterateValues(hashMap);
    return PIPELET_NEXT;
}

function iterateEntries(hashMap) {
	var iterator = hashMap.entrySet().iterator();
	while (iterator.hasNext()) {
		try {
			var entry = iterator.next();
			var key = entry.getKey();
			var value = entry.getValue();
	        var test = 1;
		}
		catch (e) {

		}
	}
}

function iterateValues(hashMap) {
	var values = hashMap.values();
	for (var value in values) {
        console.log(value);
	}
}

module.exports = {
		'execute': execute
}