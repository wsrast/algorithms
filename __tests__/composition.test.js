/**
 * main.js
 * this is your main test class.
 */
const Factory = require('../composition');

describe('Compositional inheritance', () => {
	let prod;
	const testObj0 = { id: 0 };

	describe('Simple baseProduct', () => {
		beforeEach(() => {
			prod = Factory.baseProduct.call(testObj0);
		});

		it('should create a simple prod', () => {
			const stateStr = prod.stateToString();
			expect(stateStr).toBe(JSON.stringify(testObj0, null, 4));
		});
	});

	describe('Loyalty product', () => {
		const lMemberStr = 'I can process Loyalty Memberships';
		const testObj1 = { id: 1, description: 'Desc 1' };

		beforeEach(() => {
			prod = {
				...Factory.baseProduct.call(testObj1),
				...Factory.loyaltyMembershipProduct.call({}),
			};
		});

		it('should show the description', () => {
			expect(prod.processLoyaltyMembership()).toBe(lMemberStr);
		});

		it('should return the memberships count', () => {
			expect(prod.membershipsCount()).toBe(1);
		});

		it('should still allow access to stateToString', () => {
			const stateStr = prod.stateToString();
			expect(stateStr).toBe(JSON.stringify(testObj1, null, 4));
		});
	});

	describe('Product manager', () => {
		const testObj2 = { id: 2, description: 'Desc 2' };
		const prodMgr = Factory.productManager();
		let prod2;

		beforeEach(() => {
			prod = {
				...Factory.baseProduct.call(testObj2),
			};
			prod2 = {
				...Factory.baseProduct.call(testObj2),
				...Factory.loyaltyMembershipProduct.call({}),
			};
		});

		it('should return base abilities', () => {
			expect(prodMgr.processProduct(prod).tracking).toBe(false);
			expect(prodMgr.processProduct(prod).loyaltyMembership).toBe(false);
		});

		it('should return loyalty membership abilities', () => {
			expect(prodMgr.processProduct(prod2).tracking).toBe(true);
			expect(prodMgr.processProduct(prod2).loyaltyMembership).toBe(true);
		});
	});
});
