# Irrelon PromiseMap
This micro-helper allows you to do a Promise.all() except instead of
passing an array of promises that you then extract via array indices
you can pass an object of key / values with each value being a promise
and then extract resolved values by key name instead:

```js
const result = await promiseMap({
    foo: fetch("https://www.google.com"),
    bar: someOtherPromise
});

// result.foo is now the fetch response
// result.bar is the response from your other theoretical promise
```

## Install
```bash
npm i @irrelon/promise-map
```

## Usage
### TypeScript and ES6 Modules
```js
import {promiseMap} from "@irrelon/promise-map";
```

### CommonJS
```js
const {promiseMap} = require("@irrelon/promise-map").default;
```
