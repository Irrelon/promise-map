async function promiseMap(obj, settleAll = false) {
    const objKeys = Object.keys(obj);
    const promises = objKeys.map((key) => obj[key]);
    let results;
    if (settleAll) {
        results = await Promise.allSettled(promises);
    }
    else {
        results = await Promise.all(promises);
    }
    return objKeys.reduce((acc, key, index) => {
        acc[key] = results[index];
        return acc;
    }, {});
}
export { promiseMap };
