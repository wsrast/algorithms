import cases from 'jest-in-case';
import getMissingNum from '../lowestmissing';

describe('Lowest missing number from an array', () => {
	const set1 = [];
	for (let x = 1; x < 10; x++) {
		set1.push(x);
	}
	const set2 = set1.filter(v => v !== 5 && v !== 8);
	const set3 = [];
	for (let y = Number.MAX_SAFE_INTEGER - 3; y <= Number.MAX_SAFE_INTEGER; y++) {
		set3.push(y);
	}

	cases(
		`getMissingNum([...])`,
		opts => {
			expect(getMissingNum(opts.arr, opts.start)).toBe(opts.missing);
		},
		{
			'should return the lowest missing number from a positive integer set': {
				arr: set2,
				missing: 5,
			},
			'should return null for a full set': { arr: set1, missing: null },
			'should return null for a full set with MAX_SAFE_INTEGER': {
				arr: set3,
				start: set3[0],
				missing: null,
			},
			'should return null for an empty set': { arr: [], missing: null },
			'should return null for a set with only the number 1': {
				arr: [1],
				missing: null,
			},
			'should return null for a set with only 0': {
				arr: [0],
				missing: null,
			},
			'should return null for a set with negative numbers': {
				arr: [-1, -3, -9, -1243],
				missing: null,
			},
		}
	);
});
