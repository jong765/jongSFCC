'use strict';

function getLast_N_ElementsOfArrayList(arrayList, N) {
	var returnArray = [];

	for (var i = arrayList.size()-1, j=0; i >=0 && N > 0; N--) {
		returnArray[j++] = arrayList.get(i--);
	}

	return returnArray.reverse();
}

module.exports = {
	getLast_N_ElementsOfArrayList : getLast_N_ElementsOfArrayList
}