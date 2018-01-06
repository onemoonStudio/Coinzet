const UserModel = require('../../model/user/schema');

function user_signup(req,res){
    // new UserModel({
    //     username: 'test',
    //     device_id : 't1',
    //     kakao : {
    //         provider: 'kakao',
    //         nickname : 'hello_world'
    //     }
    // }).save();

    res.send('hello signup');
}

function find_user(req,res){
    UserModel.find().exec((err,data)=>{
        err ? console.log(err) : 
        res.json(data);
    });

}

function kakao_token(req,res){
    res.send('hello token');
}


module.exports = {
    user_signup , kakao_token , find_user
};