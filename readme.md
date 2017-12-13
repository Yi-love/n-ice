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

log:

```js
{ 
  perfect: 1,
  data:
  { 
    companyUrl: 'http://www.vicon.com.hk/',
    lotSize: 2000,
    price: [ 1, 1.2 ],
    ipoTime: { startTime: [Array], endTime: [Array] },
    publishTime: [ '12', '21' ],
    boardTime: [ '17', '12', '22' ] 
  } 
}
```