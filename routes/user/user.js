const router = require('express').Router();
const ctrl = require('./user.ctrl');

router
.get('/',(req,res)=>{
    res.send('hello user');
})
.get('/find',ctrl.find_user)
.get('/signup',ctrl.user_signup)
.get('/kakao',ctrl.kakao_token)

module.exports = router;