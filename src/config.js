'use strict';

const ICE_URL = 'http://www.etnet.com.hk/www/tc/stocks/ci_ipo_detail.php';

const ICE_URL_DEFAULT = 'http://www.etnet.com.hk/www/tc/stocks/ci_ipo.php';
const ICE_GET_OPTIONS = {
    code: '',
    type: 'listing'
};

exports.ICE_URL = ICE_URL;
exports.ICE_URL_DEFAULT = ICE_URL_DEFAULT;
exports.ICE_GET_OPTIONS = ICE_GET_OPTIONS;