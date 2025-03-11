"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = __importDefault(require("node:assert"));
const promiseMap_1 = require("../src/promiseMap");
describe("promiseMap()", () => {
    it("Will resolve correctly to an object", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, promiseMap_1.promiseMap)({
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
        node_assert_1.default.strictEqual(result.foo, 1234, "Resolved value is correct");
        node_assert_1.default.strictEqual(result.bar, 4321, "Resolved value is correct");
    }));
    it("Will catch at the end of the chain when an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        let errCalled = 0;
        yield (0, promiseMap_1.promiseMap)({
            foo: new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject({ "bar": false });
                }, 1000);
            })
        }).catch((err) => {
            errCalled++;
        });
        node_assert_1.default.strictEqual(errCalled, 1, "Error was catch called correct number of times");
    }));
    it("Will resolve at the end of the chain when an error occurs and `settleAll` option is set true", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, promiseMap_1.promiseMap)({
            foo: new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(1234);
                }, 1000);
            }),
            bar: new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(4321);
                }, 500);
            })
        }, true);
        node_assert_1.default.strictEqual(result.foo.status, "fulfilled", "Resolved value is correct");
        node_assert_1.default.strictEqual(result.foo.value, 1234, "Resolved value is correct");
        node_assert_1.default.strictEqual(result.bar.status, "rejected", "Resolved value is correct");
        node_assert_1.default.strictEqual(result.bar.reason, 4321, "Resolved value is correct");
    }));
    it("Will correctly infer TypeScript type from return value", () => __awaiter(void 0, void 0, void 0, function* () {
        function asyncTest() {
            return __awaiter(this, void 0, void 0, function* () {
                return { "foo": "hello" };
            });
        }
        const result = yield (0, promiseMap_1.promiseMap)({
            asyncTest: asyncTest()
        });
        node_assert_1.default.strictEqual(result.asyncTest.foo, "hello", "Resolved value is correct");
    }));
});
