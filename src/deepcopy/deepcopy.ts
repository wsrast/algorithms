/**
 * Make a deep copy using the JSON stringify/parse pattern
 * @param {Object} srcObj - object to be copied
 * @returns {Object}
 */
const makeJSONCopy: Function = (srcObj: object): object => {
	return JSON.parse(JSON.stringify(srcObj));
};

/**
 * Make a shallow copy using the spread operator
 * @param {Object} srcObj - object to be copied
 * @returns {Object}
 */
export const makeSpreadCopy: Function = (srcObj: object): object => {
	return { ...srcObj };
};

export const forInCopy: Function = (srcObj: any): object => {
	const destObj: any = {};
	for (let prop in srcObj) {
		destObj[prop] = srcObj[prop];
	}
	return destObj;
};

export const objAssignCopy: Function = (srcObj: any): object => {
	return Object.assign({}, srcObj);
};

export default makeJSONCopy;
