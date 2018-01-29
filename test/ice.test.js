'use strict';

const ice = require('../index');

ice('08519').then((result)=>{
    console.log('result: ' , result);
} , (err)=>{
    console.log('error: ' , err);
});