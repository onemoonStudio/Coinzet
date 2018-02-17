const CommunityModel = require('../../model/community/schema');

class CommunityCtrl{
    
    // GET
    static hello(req,res) {
        res.send('hello community !');
    }

    static view_all(req,res){
        CommunityModel.find().exec((err,data) => {
            if(err) console.log(err);
            res.json(data);
        })
    }
    
    static view_target(req,res) {
        let tmp_target = req.params.target ? req.params.target : null;

        CommunityModel.find({ _id : tmp_target }).exec((err,data) => {
            err ? console.log(err) : 
            res.json(data);
        });
    }

    // POST 
    static create_article(req,res) {
        // what_coin(optional) , writer , content
        var tmpObj = {
            what_coin : req.body.what_coin ? req.body.what_coin : 'free' ,
            writer : req.body.writer.trim(),
            content : req.body.content
        };

        new CommunityModel(tmpObj).save( err => {
            if(err) res.json({ err : `Create Article is failled ERR -> ${err} ` });
            // else res.json({ ok : 'Article is created'});
            else {
                let resultObj = tmpObj;
                resultObj.ok = "Article is created";
                res.json(resultObj);
            }
        });
    }

    static update_article(req,res){
        // article_id , new_content
        // update only content

        // version_1
        // CommunityModel.findOne({_id : req.body.article_id}).exec((err,data) => {
        //     if(err) console.log(err);
        //     data.content = req.body.new_content;
        //     data.save();
        //     res.json(data);
        // });

        // new version ( check upsert )
        CommunityModel.findOneAndUpdate(
            {_id:req.body.article_id} ,         // query
            {content : req.body.new_content} ,  // update
            {new : true},                       // options
            (err,data) => {                     // callback
                if(err) throw err;
                res.json(data);
            })
    }

    static delete_article(req,res){
        // article_id
        CommunityModel.remove({_id : req.body.article_id}).exec((err,data) => {
            if(err) throw err;
            res.json({ ok : "article is removed" });
        })
    }

    // reply
    static add_reply(req,res){
        // parent_id , writer , content
        CommunityModel.findOne({_id : req.body.parent_id}).exec((err,data) => {
            if(err) throw err;
            data.reply.push({
                writer : req.body.writer ,
                content : req.body.content
            });
            data.save((save_err) => {
                if(save_err) throw err;
                res.json(data);
            })
            
        })
    }

    static delete_reply(req,res){
    // parent_id , target_id
    CommunityModel.findOne({_id : req.body.parent_id}).exec((err,data) => {
        if(err) throw err;
        data.reply.remove({_id : req.body.target_id});
        data.save();
        res.json(data);
    })
        
    }

}

module.exports = CommunityCtrl;