'use strict'

function execute(args) {
    var fruitList = new dw.util.ArrayList();
    fruitList.add("apple");
    fruitList.add("orange");
    loopThroughElements(fruitList);
    return PIPELET_NEXT;
}

function loopThroughElements(fruitList) {
	var fruitIter = fruitList.iterator();
	while (fruitIter.hasNext()) {
		var fruit = fruitIter.next();
	}
}

module.exports = {
	'execute': execute
}