const router = require('express').Router();
const ctrl = require('./api_v2.ctrl');

router.get('/',ctrl.guide)
.get('/all',ctrl.all_price)
.get('/raw',ctrl.raw)
.get('/coin_name/:coin' , ctrl.coin )
.get('/trade_center/:trade_center' , ctrl.trade_center )
.get('/test',ctrl.wow)


module.exports = router;