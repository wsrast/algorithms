/**
 * factory.js
 * A simple module to contain our base classes and a few specializations.
 */
const baseProduct = function baseProduct() {
	return {
		...this,
		...{
			stateToString: () => {
				return JSON.stringify(
					{
						id: this.id,
						description: this.description,
					},
					null,
					4
				);
			},
		},
	};
};

/**
 * Implements a loyalty membership aware product.
 */
function loyaltyMembershipProduct() {
	this.servicesDescription = 'I can process Loyalty Memberships';

	return {
		...this,
		...{
			processLoyaltyMembership: () => {
				return this.servicesDescription;
			},

			membershipsCount: () => {
				return 1;
			},
		},
	};
}

/**
 * A simple mock for a product manager feature.
 * -processProduct(): -Given a product, print out its capabilities.
 */
function productManager() {
	return {
		...this,
		...{
			processProduct: product => {
				return {
					tracking: !!product.membershipsCount,
					loyaltyMembership: !!product.processLoyaltyMembership,
				};
			},
		},
	};
}

module.exports = {
	baseProduct,
	loyaltyMembershipProduct,
	productManager,
};
