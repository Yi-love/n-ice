# N-ice
no.... not ice.


```js
const ice = require('n-ice');

ice('03878').then((result)=>{
    console.log('result: ' , result);
} , (err)=>{
    console.log('error: ' , err);
});
```