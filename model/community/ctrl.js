class CommunityModelClass{
    static find_query( query , Model ){
        Model.find({query}).exec((err,data) => {
            if(err) throw err;
            res.json(data);
        })
    }
}
