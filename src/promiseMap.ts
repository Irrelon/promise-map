type PromiseMap = {
	[key: string]: Promise<any>;
};
type ResolvedPromiseMap<T extends PromiseMap> = Promise<{ [K in keyof T]: Awaited<T[K]> }>

async function promiseMap<MapType extends PromiseMap>(obj: MapType): ResolvedPromiseMap<MapType>;
async function promiseMap<MapType extends PromiseMap>(obj: MapType, settleAll: true): ResolvedPromiseMap<MapType>;
async function promiseMap<MapType extends PromiseMap>(obj: MapType, settleAll: false): ResolvedPromiseMap<MapType>;
async function promiseMap<MapType extends PromiseMap>(obj: MapType, settleAll = false): ResolvedPromiseMap<MapType> {
	const entries = Object.entries(obj);
	const awaitedEntries = await Object.entries(obj).map(async ([key, promise]) => [key, await promise]);

	if (settleAll) {
		const settledEntries = await Promise.allSettled(awaitedEntries);
		return Object.fromEntries(
			settledEntries.map((result, index) => {
				const [key] = entries[index];
				if (result.status === 'fulfilled') return [key, result.value];
				else return [key, result.reason];
			})
		) as ResolvedPromiseMap<MapType>;
	} else {
		return Object.fromEntries(await Promise.all(awaitedEntries).catch(e => { throw e }));
	}
}

export {
	promiseMap
};

