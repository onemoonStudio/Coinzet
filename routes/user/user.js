const router = require('express').Router();
const ctrl = require('./user.ctrl');

router
.get('/',(req,res)=>{
    res.send('hello user');
})
.get('/find',ctrl.find_user)
.get('/find/:device_id',ctrl.find_user_device_id)
.get('/test',(req,res)=>{
    res.writeHead(200,{'Content-Type' : 'text/html', 'server':'idb-cz'
    });
})

router
.post('/',ctrl.user_signup)
.post('/setting',ctrl.setting)

module.exports = router;