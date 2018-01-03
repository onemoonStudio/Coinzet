const mongoose = require('mongoose');

const CoinPriceModel = new mongoose.Schema({
    coin_name : { type: String , required : true },
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