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
const promiseMap_1 = __importDefault(require("../src/promiseMap"));
describe("promiseMap()", () => {
    it("Will catch at the end of the chain when an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        let errCalled = 0;
        yield (0, promiseMap_1.default)({
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
});
