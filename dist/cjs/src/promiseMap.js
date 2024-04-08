"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function promiseMap(obj) {
    return new Promise((resolve, reject) => {
        const objKeyArr = Object.keys(obj);
        const promiseArr = [];
        objKeyArr.forEach((key) => {
            promiseArr.push(obj[key]);
        });
        Promise.all(promiseArr).then((results) => {
            const finalObj = {};
            objKeyArr.forEach((key, index) => {
                finalObj[key] = results[index];
            });
            resolve(finalObj);
        }).catch((err) => {
            reject(err);
        });
    });
}
exports.default = promiseMap;
