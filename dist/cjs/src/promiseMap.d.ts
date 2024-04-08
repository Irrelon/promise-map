declare function promiseMap(obj: Record<string, Promise<any>>): Promise<Record<string, any>>;
declare function promiseMap(obj: Record<string, Promise<any>>, settleAll: true): Promise<Record<string, PromiseSettledResult<any>>>;
declare function promiseMap(obj: Record<string, Promise<any>>, settleAll: false): Promise<Record<string, any>>;
export { promiseMap };
export default promiseMap;
