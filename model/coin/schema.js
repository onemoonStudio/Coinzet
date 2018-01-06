const mongoose = require('mongoose');

const CoinPriceModel = new mongoose.Schema({
    coin_name : { type: String , required : true },
    // coin_price_standard : {type: Number},
    // coin_price_standard <- 밤 12시 기준으로 가격을 가져온다.
    // volume ? 한번 확인해보기
    market_price_arr : [{
        timestamp : {type : Date , default: new Date() }  ,
        korbit : {type: Number },
        bithumb : {type: Number },
        coinone : {type: Number },
        upbit : {type : Number}
    }]

});

const CoinMarketPriceModel = mongoose.model('CoinMarketPrice',CoinPriceModel);

module.exports = CoinMarketPriceModel;