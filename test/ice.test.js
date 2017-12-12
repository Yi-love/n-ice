'use strict';

const ice = require('../index');

ice('03878').then((result)=>{
    console.log('result: ' , result);
} , (err)=>{
    console.log('error: ' , err);
});