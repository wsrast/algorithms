/**
 * @param {Array} arr - An Array containing a series of int Numbers.
 * @param {Number} [start] - optional start number. Adding for testing purposes.
 * @returns {Number|null} Return the missing Number or null if complete set.
 */
const getMissingNum = (arr, start = 1) => {
	const max = Math.max(...arr);

	for (let n = start; n < max; n++) {
		if (!arr.includes(n)) return n;
	}
	return null;
};

export default getMissingNum;
