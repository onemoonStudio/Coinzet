const router = require('express').Router();
const ctrlClass = require('./community.ctrl');

router
    .get('/',ctrlClass.hello)
    .get('/view/:target',ctrlClass.view)
    .get('/test',ctrlClass.test)
    ;

router
    .post('/',ctrlClass.create)
    ;

module.exports = router;