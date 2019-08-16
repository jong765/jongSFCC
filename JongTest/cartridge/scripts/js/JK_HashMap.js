var HashMap = require('dw/util/HashMap');

function execute(args) {
    var hashMap = new HashMap();
    hashMap.put("1","a");
    hashMap.put("2", "b");
    iterateValues(hashMap);
    return PIPELET_NEXT;
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