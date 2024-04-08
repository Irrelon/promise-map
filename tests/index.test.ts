import assert from "node:assert";
import promiseMap from "../src/promiseMap";

describe("promiseMap()", () => {
	it("Will resolve correctly to an object", async () => {
		const result = await promiseMap({
			foo: new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(1234);
				}, 1000);
			}),
			bar: new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(4321);
				}, 500);
			})
		});

		assert.strictEqual(result.foo, 1234, "Resolved value is correct");
		assert.strictEqual(result.bar, 4321, "Resolved value is correct");
	});

	it("Will catch at the end of the chain when an error occurs", async () => {
		let errCalled = 0;

		await promiseMap({
			foo: new Promise((resolve, reject) => {
				setTimeout(() => {
					reject({"bar": false});
				}, 1000);
			})
		}).catch((err: any) => {
			errCalled++;
		});

		assert.strictEqual(errCalled, 1, "Error was catch called correct number of times");
	});
});
