//Router
const basic_router = require('express').Router();
basic_router.get('/',(req,res) => {
    res.send('hello world');
});


const router = {
    basic : basic_router ,
    api : require('./api/api'),
    user : require('./user/user'),
    community : require('./community/community')

}

module.exports = router;