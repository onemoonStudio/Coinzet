const router = require('express').Router();
const ctrl = require('./api.ctrl');

router.get('/',ctrl.guide)
.get('/all',ctrl.show_all_api)
.get('/all_raw',ctrl.show_all_raw)
.get('/coinone',ctrl.see_coinone)
.get('/bithumb',ctrl.see_bithumb)
.get('/korbit/:coin',ctrl.see_korbit)
.get('/upbit/:coin',ctrl.see_upbit)
.get('/coin/:coin_name',ctrl.coin_name)


module.exports = router;