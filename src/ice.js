'use strict';

const ajiax = require('ajiax');

const config = require('./config');
const parser = require('./parser');


function ice(code = '') {
    return ajiax.get({url: config.ICE_URL , query: Object.assign({} , config.ICE_GET_OPTIONS , {code})}).then(parser.parse);
};

module.exports = ice;