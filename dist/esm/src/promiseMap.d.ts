declare function promiseMap<MapType extends Record<string, Promise<any>>>(obj: MapType): Promise<Record<keyof MapType, any>>;
declare function promiseMap<MapType extends Record<string, Promise<any>>>(obj: MapType, settleAll: true): Promise<Record<keyof MapType, PromiseSettledResult<any>>>;
declare function promiseMap<MapType extends Record<string, Promise<any>>>(obj: MapType, settleAll: false): Promise<Record<keyof MapType, any>>;
export { promiseMap };
