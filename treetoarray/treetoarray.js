/**
 * Convert incoming JS object to a flat set of
 * name/value pairs with the names corresponding
 * to the full object name path in the JSON tree.
 */

const objToFlatArray = dataObj => {
	const flattened = [];

	const recurse = (obj, nameStack = '') => {
		Object.keys(obj).forEach(key => {
			const val = obj[key];
			const hasChildren = typeof val === 'object';
			const newName = `${nameStack}/${key}`;

			if (hasChildren) recurse(val, newName);
			else
				flattened.push({
					name: newName,
					value: obj[key],
				});
		});
	};
	recurse(dataObj);

	return flattened;
};

export default objToFlatArray;
