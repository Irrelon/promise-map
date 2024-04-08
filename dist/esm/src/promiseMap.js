export default async function promiseMap(obj, settleAll = false) {
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
    const finalObj = {};
    objKeyArr.forEach((key, index) => {
        finalObj[key] = results[index];
    });
    return finalObj;
}
