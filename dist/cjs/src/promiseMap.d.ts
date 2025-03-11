declare function promiseMap<MapType extends Record<string, Promise<any>>>(obj: MapType): Promise<{
    [K in keyof MapType]: Awaited<MapType[K]>;
}>;
declare function promiseMap<MapType extends Record<string, Promise<any>>>(obj: MapType, settleAll: true): Promise<{
    [K in keyof MapType]: PromiseSettledResult<Awaited<MapType[K]>>;
}>;
declare function promiseMap<MapType extends Record<string, Promise<any>>>(obj: MapType, settleAll: false): Promise<{
    [K in keyof MapType]: Awaited<MapType[K]>;
}>;
export { promiseMap };
