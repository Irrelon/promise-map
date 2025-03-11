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
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseMap = void 0;
function promiseMap(obj_1) {
    return __awaiter(this, arguments, void 0, function* (obj, settleAll = false) {
        const objKeys = Object.keys(obj);
        const promises = objKeys.map((key) => obj[key]);
        let results;
        if (settleAll) {
            results = yield Promise.allSettled(promises);
        }
        else {
            results = yield Promise.all(promises);
        }
        return objKeys.reduce((acc, key, index) => {
            acc[key] = results[index];
            return acc;
        }, {});
    });
}
exports.promiseMap = promiseMap;
