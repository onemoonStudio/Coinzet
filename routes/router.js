//Router
const basic_router = require('express').Router();
basic_router.get('/',(req,res) => {
    res.send('hello world');
});


const router = {
    basic : basic_router ,
    api : require('./api/api'),
    api_v2 : require('./api/api_v2'),
    user : require('./user/user'),
    community : require('./community/community')

}

module.exports = router;