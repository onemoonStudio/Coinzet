'use strict';
const Promise = require('bluebird');
const Request = require('request');
const curl = require('curl');
const cheerio = require('cheerio');

const api_uri = require('../../config').api_uri;

var options = {
    "method": "GET",
    "port": "80",
    "headers": {
      "Connection":"Keep-Alive"
    }
};

function Coin_value_by_provider(krw,updown,percent,volume){
    this.price = krw;
    this.updown = updown;
    this.updown_percent = percent;
    this.volume = volume;
}

function convert_kr_en(kr){
    switch(kr){
        case '빗썸':
        return 'bithumb';
        case '코인원':
        return 'coinone';
        case '코빗':
        return 'korbit';
        case '업비트':
        return 'upbit';
        case '코인네스트':
        return 'coinnest';
        case '폴로닉스':
        return 'poloniex';
        case '비트렉스':
        return 'bittrex';
        case '파이넥스':
        return 'finex';
    }
}

const coinpan = function(s_time){
    return new Promise((resolve,reject)=>{
        Request( api_uri.coinpan + s_time , options , (err,response,body)=>{
            err ? reject(err) : 
            resolve(body);
        } )
    })
}




class api_v2{
    // guide
    static guide(req,res){
        res.json({
            hello : 'idb team',
            all : '/api_v2/all => show trimed data',
            raw : '/api_v2/raw => show raw data' , 
            coin_name : '/api_v2/coin_name/{coin} => ex) /api_v2/coin_name/btc',
            trade_center : '/api_v2/trade_center/{trade_center} => ex) /api_v2/trade_center/bithumb',
            ps : ' coinest 제외 '
        })
    }

    // raw
    static raw(req,res){
        var temp = Date.parse(new Date())/1000;
        // 현재시간을 Date 기준 초로 나타낸다
        coinpan(temp)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            throw err;
        })
    }

    // home
    static all_price(req,res){
        var temp = Date.parse(new Date())/1000;
        // 현재시간을 Date 기준 초로 나타낸다
        coinpan(temp)
        .then((result) => {
            var new_result = {};
            const $ = cheerio.load(result);

            $('dd').each(function(){
                var coin = $(this).data('cid');
                new_result[coin] = new Object();

                var price_table_divided = $(this).find('tbody tr');
                price_table_divided.each(function(){
                    var $this = $(this);
                    var provider =convert_kr_en($this.find('th').text().trim());
                    if($this.find('td').eq(0).text() == '-'){}else{
                        var tmp = new Coin_value_by_provider(
                            $this.find('td').eq(0).text(),
                            $this.find('td').eq(2).text().split(' ')[1],
                            $this.find('td').eq(2).text().split(' ')[2],
                            $this.find('td').eq(4).text()
                        );
                        new_result[coin][provider] = tmp;
                    }
                });

            })
            res.json(new_result);
        })
        .catch((err) => {
            throw err;
        })
    }
    
    // coin name
    static coin(req,res){
        var target = req.params.coin;
        var temp = Date.parse(new Date())/1000;
        // 현재시간을 Date 기준 초로 나타낸다
        coinpan(temp)
        .then((result) => {
            var new_result = {};
            const $ = cheerio.load(result);

            $('dd').each(function(){
                var coin = $(this).data('cid');
                if(coin == target){
                    new_result[coin] = new Object();
                    var price_table_divided = $(this).find('tbody tr');
                    price_table_divided.each(function(){
                        var $this = $(this);
                        var provider =convert_kr_en($this.find('th').text().trim());
                        if($this.find('td').eq(0).text() == '-'){}else{
                            var tmp = new Coin_value_by_provider(
                                $this.find('td').eq(0).text(),
                                $this.find('td').eq(2).text().split(' ')[1],
                                $this.find('td').eq(2).text().split(' ')[2],
                                $this.find('td').eq(4).text()
                            );
                            new_result[coin][provider] = tmp;
                        }
                    });
                } 
            })

            if(JSON.stringify(new_result) == '{}'){
                res.send('check your coin_name => ' + target);
            }else{
                res.json(new_result);
            }
            
        })
        .catch((err) => {
            throw err;
        })
    }

    // trade center
    static trade_center(req,res){
        var target = req.params.trade_center;
        var temp = Date.parse(new Date())/1000;
        // 현재시간을 Date 기준 초로 나타낸다
        coinpan(temp)
        .then((result) => {
            var new_result = {};
            const $ = cheerio.load(result);
            $('dd').each(function(){
                var coin = $(this).data('cid');
                var price_table_divided = $(this).find('tbody tr');
                price_table_divided.each(function(){
                    var $this = $(this);
                    var provider =convert_kr_en($this.find('th').text().trim());

                    if(provider == target){
                        if($this.find('td').eq(0).text() == '-'){}else{
                            var tmp = new Coin_value_by_provider(
                                $this.find('td').eq(0).text(),
                                $this.find('td').eq(2).text().split(' ')[1],
                                $this.find('td').eq(2).text().split(' ')[2],
                                $this.find('td').eq(4).text()
                            );
                            new_result[coin] = tmp;
                        }
                    }else{}
                });
            })

            if(JSON.stringify(new_result) == '{}'){
                res.send('check your trade_center => ' + target);
            }else{
                res.json(new_result);
            }
            
        })
        .catch((err) => {
            throw err;
        })
    }
    static wow(req,res){
        res.send('its okay too!')
    }

}


module.exports = api_v2;