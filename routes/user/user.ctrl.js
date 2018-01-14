const UserModel = require('../../model/user/schema');

class userCtrlClass{

    // GET
    static find_user(req,res){
        UserModel.find().exec((err,data)=>{
            err ? console.log(err) : 
            res.json(data);
        });   
    }

    static find_user_device_id(req,res){
        var target = req.params.device_id;

        UserModel.findOne({device_id : target}).exec((err,data) => {
            if(err) res.json({'err' : 'err is occurred check server'});
            data == null ? 
            res.json({'sorry' : 'user is not exist , or check device_id'}) :
            res.json(data);
        })
    }

    // POST
    static user_signup(req,res){
    
        var tmpObj = {
            username: req.body.username,
            device_id : req.body.device_id || null ,
            kakao : {
                id: req.body.kakao_id,
                nickname : req.body.kakao_nickname
            }
        }
    
        new UserModel(tmpObj).save( (err) => {
            if(err) {
                res.json({'err' : 'signup is failled'});
            }else{
                res.json({'ok' : 'signup is done'});
            }
        });
    }

    static setting(req,res){
        res.send('setting');
    }
}


module.exports = userCtrlClass;