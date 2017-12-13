'use strict';

const { URL } = require('url');

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

        let companyUrl = baseArr.eq(2).find('a').eq(0).attr('href').trim();
                
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

function getPerfectInformation(result){
    let information = {};
    try{    
        let data = result.data;
        information.companyUrl = new URL(data.companyUrl).href;
        information.lotSize = Math.round(+(('' + data.lotSize).replace(/[^0-9]/g , '')));
        information.price = ('' + data.price).replace(/[^0-9.,]/g , ' ').replace(/\s+/g,' ').replace(/,/g , '').trim().split(' ');
        information.price[0] = +information.price[0];
        information.price[1] = +information.price[1];

        information.ipoTime = data.ipoTime.match(/(\d+年\s*)?\d+月\s*\d+日\s*/g);
        information.ipoTime = {
            startTime: ('' + information.ipoTime[0]).replace(/[^0-9]/g , ' ').replace(/\s+/g,' ').trim().split(' '),
            endTime: ('' + information.ipoTime[1]).replace(/[^0-9]/g , ' ').replace(/\s+/g,' ').trim().split(' ')
        }

        information.publishTime = data.publishTime.match(/(\d+年\s*)?\d+月\s*\d+日\s*/g)[0];
        information.publishTime = information.publishTime.replace(/[^0-9]/g , ' ').replace(/\s+/g,' ').trim().split(' ');

        information.boardTime = data.boardTime.match(/(\d+年\s*)?\d+月\s*\d+日\s*/g)[0];
        information.boardTime = information.boardTime.replace(/[^0-9]/g , ' ').replace(/\s+/g,' ').trim().split(' ');
    }catch(e){
        return {perfect:0};
    }
    return {perfect:1 , data:information};
}

exports.parse = ( html = '' )=>{
    const $ = cheerio.load(html);

    if ( !checkData($) ){
        return {perfect: 0}
    }
    let result = getInformation($);
    return getPerfectInformation(result);
}