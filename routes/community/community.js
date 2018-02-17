const router = require('express').Router();
const ctrlClass = require('./community.ctrl');

router
    .get('/',ctrlClass.hello)
    .get('/view_all', ctrlClass.view_all)
    .get('/view_target/:target',ctrlClass.view_target)
    ;

router
    .post('/',ctrlClass.create_article)
    .post('/update',ctrlClass.update_article)
    .post('/delete',ctrlClass.delete_article)
    .post('/add_reply',ctrlClass.add_reply)
    .post('/delete_reply',ctrlClass.delete_reply)
    ;

module.exports = router;