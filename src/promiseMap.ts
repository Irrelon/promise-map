async function promiseMap<MapType extends Record<string, Promise<any>>>(
	obj: MapType
): Promise<{ [K in keyof MapType]: Awaited<MapType[K]> }>;
async function promiseMap<MapType extends Record<string, Promise<any>>>(
	obj: MapType,
	settleAll: true
): Promise<{ [K in keyof MapType]: PromiseSettledResult<Awaited<MapType[K]>> }>;
async function promiseMap<MapType extends Record<string, Promise<any>>>(
	obj: MapType,
	settleAll: false
): Promise<{ [K in keyof MapType]: Awaited<MapType[K]> }>;
async function promiseMap<MapType extends Record<string, Promise<any>>>(
	obj: MapType,
	settleAll = false
): Promise<
	| { [K in keyof MapType]: Awaited<MapType[K]> }
	| { [K in keyof MapType]: PromiseSettledResult<Awaited<MapType[K]>> }
> {
	const objKeys = Object.keys(obj) as (keyof MapType)[];
	const promises = objKeys.map((key) => obj[key]);

	let results: any;

	if (settleAll) {
		results = await Promise.allSettled(promises);
	} else {
		results = await Promise.all(promises);
	}

	return objKeys.reduce((acc, key, index) => {
		acc[key] = results[index];
		return acc;
	}, {} as any);
}

export { promiseMap };