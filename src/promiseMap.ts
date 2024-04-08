export default async function promiseMap (obj: Record<string, Promise<any>>, settleAll = false) {
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
