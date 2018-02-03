const router = require('express').Router();
const ctrlClass = require('./user.ctrl');

router
.get('/',(req,res)=>{
    res.send('hello user');
})
.get('/find',ctrlClass.find_user)
.get('/find/:device_id',ctrlClass.find_user_device_id)
.get('/test',(req,res)=>{
    res.writeHead(200,{'Content-Type' : 'text/html', 'server':'idb-cz'
    });
})

router
.post('/',ctrlClass.user_signup)
.post('/setting',ctrlClass.setting)

module.exports = router;