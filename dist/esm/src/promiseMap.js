async function promiseMap(obj, settleAll = false) {
    const objKeyArr = Object.keys(obj);
    const promiseArr = [];
    objKeyArr.forEach((key) => {
        promiseArr.push(obj[key]);
    });
    let results;
    if (settleAll) {
        results = await Promise.allSettled(promiseArr);
    }
    else {
        results = await Promise.all(promiseArr).catch((err) => {
            throw err;
        });
    }
    return objKeyArr.reduce((newObj, key, index) => {
        newObj[key] = results[index];
        return newObj;
    }, {});
}
export { promiseMap };
