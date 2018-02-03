const mongoose = require('mongoose');

const CommunityArticleSchema = new mongoose.Schema({
    what_coin : String ,
    writer : {type : String , required : true} , 
    content : String ,
    reply : [{
        timestamp : {type : Date , default: new Date() }  ,
        writer : String , 
        content : String
    }],
    timestamp : {type : Date , default: new Date() }

});

const CommunityArticleModel = mongoose.model('CommunityArticle',CommunityArticleSchema);

module.exports = CommunityArticleModel;