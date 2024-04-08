async function promiseMap (obj: Record<string, Promise<any>>): Promise<Record<string, any>>;
async function promiseMap (obj: Record<string, Promise<any>>, settleAll: true): Promise<Record<string, PromiseSettledResult<any>>>;
async function promiseMap (obj: Record<string, Promise<any>>, settleAll: false): Promise<Record<string, any>>;
async function promiseMap (obj: Record<string, Promise<any>>, settleAll = false): Promise<Record<string, any>> {
	const objKeyArr = Object.keys(obj);
	const promiseArr: Promise<any>[] = [];

	objKeyArr.forEach((key) => {
		promiseArr.push(obj[key]);
	});

	let results;

	if (settleAll) {
		results = await Promise.allSettled(promiseArr);
	} else {
		results = await Promise.all(promiseArr).catch((err) => {
			throw err;
		});
	}

	const finalObj: Record<string, () => any> = {};

	objKeyArr.forEach((key, index) => {
		finalObj[key] = results[index];
	});

	return finalObj;
}

export {
	promiseMap
};
export default promiseMap;
