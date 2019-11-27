const intersect = (str1: string | undefined, str2: string | undefined) => {
	let ret: Array<Number> = [];
	// if either of the strings are empty, return empty set.
	if (typeof str1 !== 'string' || typeof str2 !== 'string') return ret;

	let arr1 = str1.split(',').map(n => parseInt(n, 10));
	let arr2 = str2.split(',').map(n => parseInt(n, 10));

	// filter intersections into return array
	const minLength = Math.min(arr1.length, arr2.length);
	for (let n = 0; n < minLength; n++) {
		if (arr1[n] === arr2[n]) ret.push(arr1[n]);
	}

	return ret;
};

export default intersect;
