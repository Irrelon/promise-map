async function promiseMap<MapType extends Record<string, Promise<any>>>(obj: MapType): Promise<Record<keyof MapType, any>>;
async function promiseMap<MapType extends Record<string, Promise<any>>> (obj: MapType, settleAll: true): Promise<Record<keyof MapType, PromiseSettledResult<any>>>;
async function promiseMap<MapType extends Record<string, Promise<any>>> (obj: MapType, settleAll: false): Promise<Record<keyof MapType, any>>;
async function promiseMap<MapType extends Record<string, Promise<any>>> (obj: MapType, settleAll = false): Promise<Record<keyof MapType, any>> {
	const objKeyArr: (keyof MapType)[] = Object.keys(obj);
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

	return objKeyArr.reduce((newObj: Partial<Record<keyof MapType, () => any>>, key, index) => {
		newObj[key] = results[index];
		return newObj;
	}, {}) as Record<keyof MapType, () => any>;
}

export {
	promiseMap
};
