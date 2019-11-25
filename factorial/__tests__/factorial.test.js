import factorial from '../factorial';

describe('Simple factorial function', () => {
	it('should return 1 for a zero', () => {
		expect(factorial(0)).toBe(1);
	});

	it('should return the factorial of 3', () => {
		expect(factorial(3)).toBe(6);
	});

	it('should return the factorial of 9', () => {
		expect(factorial(9)).toBe(362880);
	});

	it('should return the factorial of 12', () => {
		expect(factorial(12)).toBe(479001600);
	});

	it('should return 1 instead of the gamma function for negatives', () => {
		expect(factorial(-10)).toBe(1);
	});
});
