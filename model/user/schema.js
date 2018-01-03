const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema({
    username : { type: String , required : true },
    device_id: {type:String},
    kakao : {type : Object},
    K_Access_Token: {type:String},
    

});

const UserModel = mongoose.model( 'User' , UserModelSchema);

module.exports = UserModel;