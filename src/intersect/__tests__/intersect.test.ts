import cases from 'jest-in-case';
import intersect from '../intersect';

describe('Intersection of Number Strings', () => {
	cases(
		'intersect(string, string)',
		({ str1, str2, arr }) => {
			expect(intersect(str1, str2)).toEqual(arr);
		},
		{
			'should return empty array for invalid sets': {
				str1: undefined,
				str2: '',
				arr: [],
			},
			'should return empty array for empty sets': {
				str1: '',
				str2: '',
				arr: [],
			},
			'should return emtpy array for malformed strings': {
				str1: 'xxxx',
				str2: '1,2,3',
				arr: [],
			},
			'should return identical array for matching sets': {
				str1: '1,2,3',
				str2: '1,2,3',
				arr: [1, 2, 3],
			},
			'should return intersected values [8,12]': {
				str1: '3,8,11,12,13',
				str2: '1,8,10,12,15',
				arr: [8, 12],
			},
		}
	);
});
