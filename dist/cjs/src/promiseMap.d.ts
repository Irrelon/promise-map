export default function promiseMap(obj: Record<string, Promise<any>>, settleAll?: boolean): Promise<Record<string, () => any>>;
