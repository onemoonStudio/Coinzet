const mongoose = require('mongoose');
const ctrlClass = require('./ctrl');

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

CommunityArticleModel.find_query = function( query ){
    CommunityArticleModel.find(query, (err,data) => {
        if(err) throw err;
        // if parameter is like (query , res) you can use res.json(data);
        return data;
        // data is returned but it seems like return {nothing} because of asynchronous caracteristic
    })
}

module.exports = CommunityArticleModel;