import assert from "node:assert";
import promiseMap from "../src/promiseMap";
describe("promiseMap()", () => {
    it("Will catch at the end of the chain when an error occurs", async () => {
        let errCalled = 0;
        await promiseMap({
            foo: new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject({ "bar": false });
                }, 1000);
            })
        }).catch((err) => {
            errCalled++;
        });
        assert.strictEqual(errCalled, 1, "Error was catch called correct number of times");
    });
});
