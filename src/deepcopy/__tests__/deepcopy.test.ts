import makeJSONCopy, {
	objAssignCopy,
	forInCopy,
	makeSpreadCopy,
} from '../deepcopy';

interface Personable {
	name: string;
	age: number;
	job: string;
	address: {
		street: string;
		city: string;
		line2: {
			extra: string;
		};
	};
	enumerable?: string;
	fn?: Function;
}

class Person implements Personable {
	constructor() {
		this.name = 'Tony Stark';
		(this.age = 30),
			(this.job = 'Inventor'),
			(this.address = {
				street: '123 Iron Man Pkwy.',
				city: 'Los Angeles',
				line2: {
					extra: 'original',
				},
			});
	}

	name: string;
	age: number;
	job: string;
	address: any;
	fn?: Function;
}

describe('Deep copies', () => {
	let testObj: Person;

	beforeEach(() => {
		testObj = new Person();
	});

	const addEnumerable: Function = (mod: Person) => {
		Object.defineProperty(mod, 'enumerable', {
			value: 'this is enumerable',
			enumerable: false,
		});
	};

	const shouldBeShallow: Function = (
		mod: Person,
		src: Person,
		not: boolean = true
	): void => {
		mod.address.city = 'Atlanta';
		(not ? expect(mod) : expect(mod).not).toEqual(src);
	};

	const shouldBeDeep: Function = (
		mod: Person,
		src: Person,
		not: boolean = true
	): void => {
		mod.address.city = 'Atlanta';
		(not ? expect(mod).not : expect(mod)).toEqual(src);
	};

	/**
	 * Make a change 2 levels deep in the tree and expect that difference
	 * to be unique in the modified object.
	 * @param {Person} mod - object to modify
	 * @param {Person} src - original object for comparison
	 * @param {boolean} not - flip the expectation boolean
	 */
	const shouldBeVeryDeep: Function = (
		mod: Person,
		src: Person,
		not: boolean = true
	): void => {
		mod.address.line2.extra = 'modified';
		(not ? expect(mod).not : expect(mod)).toEqual(src);
	};

	const shouldCopyNonEnumerableProperties: Function = (
		mod: Person,
		copier: Function,
		not: boolean = true
	): void => {
		addEnumerable(mod);
		const { enumerable } = copier(mod);
		(not ? expect(enumerable).not : expect(enumerable)).toBeUndefined();
	};

	const shouldCopyFunctionProperties: Function = (
		mod: Person,
		copier: Function,
		not: boolean = true
	): void => {
		const str = 'this is returned';
		mod.fn = () => str;
		const { fn } = copier(mod);
		(not ? expect(fn).not : expect(fn)).toBeUndefined();
		if (fn) expect(fn()).toBe(str);
	};

	const shouldCopyPrototypeProperties: Function = (
		copier: Function,
		not: boolean = true
	): void => {
		const str = 'this is returned';
		Person.prototype.fn = () => str;
		const tempPerson = new Person();

		const copied = copier(tempPerson);
		(not ? expect(copied.fn).not : expect(copied.fn)).toBeUndefined();
		if (copied.fn) expect(copied.fn()).toBe(str);
		delete Person.prototype.fn;
	};

	// TODO: add test for prototype properties

	describe('spread operator', () => {
		let modifiedObj: Person;
		beforeEach(() => {
			modifiedObj = makeSpreadCopy(testObj);
			expect(modifiedObj).toEqual(testObj);
		});

		// spread method is shallow
		it('should be shallow', () => {
			shouldBeShallow(modifiedObj, testObj);
		});
		// spread method isn't deep
		it('should not be deep', () => {
			shouldBeDeep(modifiedObj, testObj, false);
		});
		// spread method of copying isn't deep to second level either.
		it('should not be very deep ', () => {
			shouldBeVeryDeep(modifiedObj, testObj, false);
		});
		// spread doesn't copy non-enumerables
		it('should not copy non-enumerables', () => {
			shouldCopyNonEnumerableProperties(modifiedObj, makeSpreadCopy, false);
		});
		// spread copies functions
		it('should copy function properties', () => {
			shouldCopyFunctionProperties(modifiedObj, makeSpreadCopy);
		});
		// spread copies prototype properties
		it('should not copy prototype properties', () => {
			shouldCopyPrototypeProperties(makeSpreadCopy, false);
		});
	});

	describe('JSON stringify/paste method', () => {
		let modifiedObj: Person;
		beforeEach(() => {
			modifiedObj = makeJSONCopy(testObj);
			expect(modifiedObj).toEqual(testObj);
		});

		// json method is not shallow
		it('should not be shallow', () => {
			shouldBeShallow(modifiedObj, testObj, false);
		});
		// json method is deep
		it('should be deep', () => {
			shouldBeDeep(modifiedObj, testObj);
		});
		// json method is very deep
		it('should be very deep', () => {
			shouldBeVeryDeep(modifiedObj, testObj);
		});
		// json doesn't copy non-enumerables
		it('should not copy non-enumerable properties', () => {
			shouldCopyNonEnumerableProperties(modifiedObj, makeJSONCopy, false);
		});
		// json copies functions
		it('should not copy function properties', () => {
			shouldCopyFunctionProperties(modifiedObj, makeJSONCopy, false);
		});
		// json copies prototype properties
		it('should not copy prototype properties', () => {
			shouldCopyPrototypeProperties(makeJSONCopy, false);
		});
	});

	describe('for...in method', () => {
		let modifiedObj: Person;
		beforeEach(() => {
			modifiedObj = forInCopy(testObj);
			expect(modifiedObj).toEqual(testObj);
		});

		it('should be shallow', () => {
			shouldBeShallow(modifiedObj, testObj);
		});
		// for...in method isn't deep
		it('should not be deep', () => {
			shouldBeDeep(modifiedObj, testObj, false);
		});
		// for...in method of copying isn't deep to second level either.
		it('should not be very deep', () => {
			shouldBeVeryDeep(modifiedObj, testObj, false);
		});
		// for...in doesn't copy non-enumerables
		it('should not copy non-enumerables', () => {
			shouldCopyNonEnumerableProperties(modifiedObj, forInCopy, false);
		});
		// fon...in copies functions
		it('should copy function properties', () => {
			shouldCopyFunctionProperties(modifiedObj, forInCopy);
		});
		// for...in copies prototype properties
		it('should copy prototype properties', () => {
			shouldCopyPrototypeProperties(forInCopy);
		});
	});

	describe('Object.assign()', () => {
		let modifiedObj: Person;
		beforeEach(() => {
			modifiedObj = objAssignCopy(testObj);
			expect(modifiedObj).toEqual(testObj);
		});

		// spread method is shallow
		it('should be shallow', () => {
			shouldBeShallow(modifiedObj, testObj);
		});
		// spread method isn't deep
		it('should not be deep', () => {
			shouldBeDeep(modifiedObj, testObj, false);
		});
		// spread method of copying isn't deep to second level either.
		it('should not be very deep ', () => {
			shouldBeVeryDeep(modifiedObj, testObj, false);
		});
		// spread doesn't copy non-enumerables
		it('should not copy non-enumerables', () => {
			shouldCopyNonEnumerableProperties(modifiedObj, objAssignCopy, false);
		});
		// spread copies functions
		it('should copy function properties', () => {
			shouldCopyFunctionProperties(modifiedObj, objAssignCopy);
		});
		// spread copies prototype properties
		it('should not copy prototype properties', () => {
			shouldCopyPrototypeProperties(objAssignCopy, false);
		});
	});
});
