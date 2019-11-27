import objToFlatArray from '../treetoarray';

describe('Object to Flat Array', () => {
	const tree1 = {
		a: 1,
		b: {
			b1: 2,
			b2: 3,
			b3: {
				b3a: 4,
			},
		},
		c: 5,
	};

	const tree2 = {
		...tree1,
		b: {},
	};

	const expectedFlat1 = [
		{ name: '/a', value: 1 },
		{ name: '/b/b1', value: 2 },
		{ name: '/b/b2', value: 3 },
		{ name: '/b/b3/b3a', value: 4 },
		{ name: '/c', value: 5 },
	];

	const expectedFlat2 = [
		{ name: '/a', value: 1 },
		{ name: '/c', value: 5 },
	];

	it('should render a simple tree as a flat array', () => {
		const flat = objToFlatArray(tree1);
		expect(flat).toEqual(expectedFlat1);
	});

	it('should skip values for an empty set', () => {
		const flat = objToFlatArray(tree2);
		expect(flat).toEqual(expectedFlat2);
	});
});
