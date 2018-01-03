const Request = require('request');
const Promise = require('bluebird');

const CoinModel = require('../../model/coin/schema');

function MakeObj(one,two){
    this[one] = two;
}

const api_uri = require('../../config').api_uri;

const currency = ['btc','etc','eth','xrp','bch'];

// 6개의 통화만??

var coinone_promise = function(){
    return new Promise((resolve,reject)=>{
        Request( api_uri.coinone ,(error,response,body) => {
            if(error) reject(error);
            resolve({
                data : JSON.parse(body)
            });
            // last 값을 체크할 것 
        })
    })
}
var bithumb_promise = function(){
    return new Promise((resolve,reject)=>{
        Request( api_uri.bithumb ,(error,response,body) => {
            if(error) reject(error);
            resolve({
                data : JSON.parse(body).data
            });
            // buy_price + sell_price / 2 를 값으로 체크 
        })
    })
}
var korbit_promise = function(coin){
    return new Promise((resolve,reject)=>{
        Request( api_uri.korbit + coin +"_krw" ,(error,response,body) => {
            if(error) reject(error);
            resolve({
                data : JSON.parse(body)
            });
            // last check
        })
    })
    // korbit + @ -> btc_krw(비트코인 거래 기준) , etc_krw(이더리움 클래식 거래 기준), 
    // eth_krw(이더리움 거래 기준), xrp_krw(리플 거래 기준), bch_krw(비트코인 캐시 기준)
}
var korbit_price = function(coin){
    return new Promise((resolve,reject)=>{
        Request( api_uri.korbit + coin +"_krw" ,(error,response,body) => {
            if(error) reject(error);
            resolve({
                price : JSON.parse(body).last,
                coin
            });
            // last check
        })
    })
    // korbit + @ -> btc_krw(비트코인 거래 기준) , etc_krw(이더리움 클래식 거래 기준), 
    // eth_krw(이더리움 거래 기준), xrp_krw(리플 거래 기준), bch_krw(비트코인 캐시 기준)
}
var upbit_promise = function(coin){
    return new Promise((resolve,reject)=>{
        Request( api_uri.upbit + coin ,(error,response,body) => {
            if(error) reject(error);
            if( !!JSON.parse(body)[0] ){
                resolve({
                    price : JSON.parse(body),
                    coin
                });
            }
        })
    })
}
var upbit_price = function(coin){
    return new Promise((resolve,reject)=>{
        Request( api_uri.upbit + coin ,(error,response,body) => {
            if(error) reject(error);
            if( !!JSON.parse(body)[0] ){
                resolve({
                    price : JSON.parse(body)[0].tradePrice,
                    coin
                });
            }
        })
    })
}

const guide = (req,res) => {
    res.json({
        hello : "coin-zet",
        api : "all / coinone / bithumb / korbit / upbit",
        individually : "/coin/{coin_name}" ,
        korbit : '/korbit/ + btc / etc / eth / xrp / bch  / ex) korbit/btc',
        upbit : '/upbit/ + coin_short_name / ex) /upbit/btc '
    });
}

const show_all_api = function(req,res){
    Promise.all([coinone_promise() , bithumb_promise() , 
        korbit_price('btc'),korbit_price('etc'),korbit_price('eth'),korbit_price('xrp'),korbit_price('bch'),
        upbit_price('btc'), upbit_price('eth'), upbit_price('qtum'), upbit_price('btg'), upbit_price('ltc'), 
        upbit_price('etc'), upbit_price('dash'), upbit_price('zec'), upbit_price('xrp'), upbit_price('xmr')

    ])
    .catch((err) => {
        if(err) throw err;
    })
    .then((result) => {
        var new_result = {};
        
        // bithumb
        var temp_bithumb = result[1].data;
        for(bithumb_index in temp_bithumb){
            new_result[bithumb_index.toLowerCase()] = new MakeObj('bithumb',temp_bithumb[bithumb_index].sell_price);
        }

        // coinone
        var temp_coinone = result[0].data;
        for(coinone_index in temp_coinone){
            // new_result[coinone_index.toLowerCase()] = new MakeObj('coinone',temp_coinone[coinone_index].last);
            if(!!new_result[coinone_index.toLowerCase()]){
                new_result[coinone_index.toLowerCase()].coinone = temp_coinone[coinone_index].last;
            }
        }

        // korbit
        for(var i = 2 ; i<7 ; i++ ){
            var tmp = result[i].coin;
            new_result[tmp].korbit = result[i].price;
        }

        // upbit
        for( var u = 7 ; u < 17 ; u++){
            var tmp = result[u].coin;
            new_result[tmp].upbit = result[i].price.toString();
        }

        return new_result;
    })
    .then((new_result)=>{
        if(req.params.coin_name){
            new_result[req.params.coin_name] ? 
            res.json(new_result[req.params.coin_name]) : 
            res.json({'err' : '다시 한번 코인 이름을 확인하세요 ! ex) btc'})
        }else{
            res.json(new_result);
        }
    })
    
}
const coin_name = show_all_api;

// const show_all_raw = function(req,res) {
//     Promise.all([coinone_promise() , bithumb_promise() , 
//         korbit_price('btc'),korbit_price('etc'),korbit_price('eth'),korbit_price('xrp'),korbit_price('bch'),
//         upbit_promise('btc'), upbit_promise('eth'), upbit_promise('qtum'), upbit_promise('btg'), upbit_promise('ltc'), 
//         upbit_promise('etc'), upbit_promise('dash'), upbit_promise('zec'), upbit_promise('xrp'), upbit_promise('xmr')
//     ])
//     .catch((err) => {
//         if(err) throw err;
//     })
//     .then((result) => {
//         res.json(result);
//     });
// }

const see_coinone = function(req,res){
    coinone_promise()
    .then((result) => {res.json(result)})
    .catch((err) => {res.json(err)})
}
const see_bithumb = function(req,res){
    bithumb_promise()
    .then((result) => {res.json(result)})
    .catch((err) => {res.json(err)})
}
const see_korbit = function(req,res){
    korbit_promise(req.params.coin)
    .then((result) => {res.json(result)})
    .catch((err) => {res.json(err)})
}
const see_upbit = function(req,res){
    upbit_price(req.params.coin)
    .then((result) => {res.json(result)})
    .catch((err) => {res.json(err)})
}

module.exports = {
    guide , show_all_api , coin_name , see_coinone , see_bithumb , see_korbit , see_upbit 
    // , show_all_raw
};




















// 아직 save 는 건드리지 않음
const saveDB = function(req,res){
    Promise.all([coinone_promise() , bithumb_promise() , 
        korbit_price('btc'),korbit_price('etc'),korbit_price('eth'),korbit_price('xrp'),korbit_price('bch') 
    ])
    .catch((err) => {
        if(err) throw err;
    })
    .then((result) => {
        var new_result = {};
        
        // bithumb
        var temp_bithumb = result[1].data;
        for(bithumb_index in temp_bithumb){
            new_result[bithumb_index.toLowerCase()] = new MakeObj('bithumb',temp_bithumb[bithumb_index].sell_price);
        }

        // coinone
        var temp_coinone = result[0].data;
        for(coinone_index in temp_coinone){
            // new_result[coinone_index.toLowerCase()] = new MakeObj('coinone',temp_coinone[coinone_index].last);
            if(!!new_result[coinone_index.toLowerCase()]){
                new_result[coinone_index.toLowerCase()].coinone = temp_coinone[coinone_index].last;
            }
        }

        // korbit
        for(var i = 2 ; i<7 ; i++ ){
            var tmp = result[i].coin;
            new_result[tmp].korbit = result[i].price;
        }
        return new_result;
    })
    .then((new_result) => {
        // console.log(new_result);
        for( index in new_result){
            if(index != 'date'){
                CoinModel.findOne({ coin_name: index }).exec((err,data)=>{
                    if(err) throw err;
                    // 여기에서는 index를 쓸 수가 없다.... 사용하려면 data.coin_name을 사용하자
                    // console.log(new_result[data.coin_name]);
                    data.market_price_arr.push(new_result[data.coin_name]);
                    data.save();
                })
            }    
        }
        res.json('ok');
    })
}