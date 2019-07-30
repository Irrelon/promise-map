const assert = require("assert");
const promiseMap = require("../index");

describe("promiseMap()", () => {
	it("Will catch at the end of the chain when an error occurs", async () => {
		let errCalled = 0;
		
		await Promise.resolve().then(() => {
			return promiseMap({
				foo: new Promise((resolve, reject) => {
					setTimeout(() => {
						reject({"bar": false});
					}, 1000);
				})
			});
		}).catch((err) => {
			errCalled++;
		});
		
		assert.strictEqual(errCalled, 1, "Error was catch called correct number of times");
	});
});
