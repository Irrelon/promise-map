export function PromiseMap (obj: Record<string, () => Promise<any>>) {
	return new Promise((resolve, reject) => {
		const objKeyArr = Object.keys(obj);
		const promiseArr: (() => Promise<any>)[] = [];

		objKeyArr.forEach((key) => {
			promiseArr.push(obj[key]);
		});

		Promise.all(promiseArr).then((results) => {
			const finalObj: Record<string, () => any> = {};

			objKeyArr.forEach((key, index) => {
				finalObj[key] = results[index];
			});

			resolve(finalObj);
		}).catch((err) => {
			reject(err);
		});
	});
}
