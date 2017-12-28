'use strict';

const ice = require('../index');

ice('02448').then((result)=>{
    console.log('result: ' , result);
} , (err)=>{
    console.log('error: ' , err);
});