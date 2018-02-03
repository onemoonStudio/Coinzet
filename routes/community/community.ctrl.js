const CommunityModel = require('../../model/community/schema');

class CommunityCtrl{
    
    // GET
    static hello(req,res) {
        res.send('hello community !');
    }
    
    static view(req,res) {
        let tmp_target = req.params.target ? req.params.target : null;
        if(!tmp_target){ 
            CommunityModel.find().exec((err,data) => {
                err ? console.log(err) : 
                res.json(data);
            })
        }else{
            CommunityModel.find({ _id : tmp_target }).exec((err,data) => {
                err ? console.log(err) : 
                res.json(data);
            })
        }
    }

    static test(req,res) {
        var tmpObj = {
            writer : 'developer',
            content : 'hello test 123'
        };

        new CommunityModel(tmpObj).save( err => {
            if(err) res.json({'err' : 'Create Article is failled'});
            else res.json({'ok' : 'Article is created'});
        });
    }

    // POST 
    static create(req,res) {
        var tmpObj = {
            what_coin : req.body.what_coin ? req.body.what_coin : 'free' ,
            writer : req.body.writer,
            content : req.body.content
        };

        new CommunityModel(tmpObj).save( err => {
            if(err) res.json({'err' : 'Create Article is failled'});
            else res.json({'ok' : 'Article is created'});
        });
    }
}

module.exports = CommunityCtrl;