'use strict';

const { URL } = require('url');

const cheerio = require('cheerio');

const { ICE_URL_DEFAULT } = require('./config');

function checkData( $ ){
    let boxDom = $('#ipoColumnBlock');
    return boxDom ? true : false;
}

function getInformation( $ ) {
    let data = {};
    try{
        let informationArr = $('.figureTable'); 
        let baseArr = informationArr.eq(0).find('tr');
        let companyUrl = ICE_URL_DEFAULT;
        if ( baseArr.eq(2).find('a').length > 0 ){
            companyUrl = baseArr.eq(2).find('a').eq(0).attr('href').trim();
        }
        let lotSize = baseArr.eq(3).find('.TableNumBlack').eq(0).text().trim();

        let stockArr = informationArr.eq(1).find('tr');

        let price = stockArr.length >= 4 ? stockArr.eq(3).find('.TableNumBlack').eq(0).text().trim() : '0';

        let timeArr = informationArr.length >= 3 ? informationArr.eq(2).find('.TableNumBlack') : [];
        let ipoTime = timeArr.length ? timeArr.eq(0).text().trim() : '';
        let publishTime = timeArr.length >= 3 ? timeArr.eq(timeArr.length !== 5 ? timeArr.length -2 : 2).text().trim() : '';
        let boardTime = timeArr.length >= 3 ? timeArr.eq(timeArr.length !== 5 ? timeArr.length - 1 : 4).text().trim() : '';

        data = { companyUrl, lotSize , price , ipoTime , publishTime , boardTime };
    }catch(e){
        return {perfect: 0 , message:e}
    }
    return {perfect: 1 , data};
}

function getPerfectInformation(result){
    let information = {};
    try{    
        let data = result.data;
        information.companyUrl = new URL(data.companyUrl).href;
        information.lotSize = Math.round(+(('' + data.lotSize).replace(/[^0-9]/g , '')));
        information.price = ('' + data.price).replace(/[^0-9.,]/g , ' ').replace(/\s+/g,' ').replace(/,/g , '').trim().split(' ');
        information.price[0] = +information.price[0];
        information.price[1] = information.price.length >= 2 ? +information.price[1] : information.price[0];

        information.ipoTime = data.ipoTime.match(/(\d+年\s*)?\d+月\s*\d+日\s*/g) || ['',''];
        information.ipoTime = {
            startTime: ('' + information.ipoTime[0]).replace(/[^0-9]/g , ' ').replace(/\s+/g,' ').trim().split(' '),
            endTime: ('' + information.ipoTime[1]).replace(/[^0-9]/g , ' ').replace(/\s+/g,' ').trim().split(' ')
        }

        information.publishTime = data.publishTime.match(/(\d+年\s*)?\d+月\s*\d+日\s*/g)[0] || '';
        information.publishTime = information.publishTime.replace(/[^0-9]/g , ' ').replace(/\s+/g,' ').trim().split(' ');

        information.boardTime = data.boardTime.match(/(\d+年\s*)?\d+月\s*\d+日\s*/g)[0] || '';
        information.boardTime = information.boardTime.replace(/[^0-9]/g , ' ').replace(/\s+/g,' ').trim().split(' ');
    }catch(e){
        return {perfect:0 , message:e};
    }
    return {perfect:1 , data:information};
}

exports.parse = ( html = '' )=>{
    const $ = cheerio.load(html);

    if ( !checkData($) ){
        return {perfect: 0 , message:'no information.'};
    }
    let result = getInformation($);
    return result.perfect ? getPerfectInformation(result) : result;
};