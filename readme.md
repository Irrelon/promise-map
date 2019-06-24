# Irrelon PromiseMap
This micro-helper allows you to do a Promise.all() except instead of
passing an array of promises that you then extract via array indices
you can pass an object of key / values with each value being a promise
and then extract resolved values by key name instead:

```js
const getData = async () => {
	const result = await promiseMap({
		foo: fetch("https://www.google.com"),
		bar: someOtherPromise
	});
};

const a = getData();

// a.foo is now the fetch response
// a.bar is the response from your other theoretical promise
```

## Install
```bash
npm i @irrelon/promise-map
```

## Usage
CommonJS
```js
const promiseMap = require("@irrelon/promise-map");
```
or

ES6 Modules (You have to handle commonjs to es6 here if your build
chain does not already have it included - most do)
```js
import promiseMap from "@irrelon/promise-map";
```