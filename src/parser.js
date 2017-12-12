'use strict';

const cheerio = require('cheerio');

function checkData( $ ){
    let boxDom = $('#ipoColumnBlock');
    return boxDom ? true : false;
}

function getInformation( $ ) {
    let perfect = 1;
    let data = {};
    try{
        let informationArr = $('.figureTable'); 
        let baseArr = informationArr.eq(0).find('tr');

        let companyUrl = baseArr.eq(2).find('a').eq(0).text().trim();
        let lotSize = baseArr.eq(3).find('.TableNumBlack').eq(0).text().trim();

        let stockArr = informationArr.eq(1).find('tr');

        let price = stockArr.eq(3).find('.TableNumBlack').eq(0).text().trim();

        let timeArr = informationArr.eq(2).find('.TableNumBlack');

        let ipoTime = timeArr.eq(0).text().trim();
        let publishTime = timeArr.eq(2).text().trim();
        let boardTime = timeArr.eq(4).text().trim();

        data = { companyUrl, lotSize , price , ipoTime , publishTime , boardTime };
    }catch(e){
        perfect = 0;
    }
    return {perfect , data};
}

exports.parse = ( html = '' )=>{
    const $ = cheerio.load(html);

    if ( !checkData($) ){
        return {perfect: 0}
    }
    return getInformation($);
}