const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema({
    username : { type: String , required : true },
    device_id: {type:String},
    kakao : {type : Object},
    k_access_token: {type:String},
    main_coin:{ type: String },
    widget: {
        coin : String,
        trade_center : String
    }
});

const UserModel = mongoose.model( 'User' , UserModelSchema);

module.exports = UserModel;