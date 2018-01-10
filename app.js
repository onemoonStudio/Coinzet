var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var no_favicon = require('express-no-favicons');
var mongoose = require('mongoose');
var config = require('./config');

const router = require('./routes/router');

var app = express();

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(no_favicon());

// DataBase 
const DB_options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500 , // Reconnect every 500ms
  poolSize: 10 , // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  promiseLibrary: require('bluebird')
}
mongoose.connect(
  `mongodb://${config.db_user}@ds121696.mlab.com:21696/idb-back`
  , DB_options ).then(
  () => { console.log('DataBase is connected'); } ,
  err => { console.error.bind(console,'Check DB - Connection error : '); }
)

// Post Check
app.post('/*',(req,res,next)=>{
  req.headers['server'] != config.server_header ? res.send('sorry your not our team') : 
  // console.log('header check is done and it flows to post process');
  next();
})

// Router
app
.use('/', router.basic)
.use('/api', router.api)
.use('/api_v2',router.api_v2)
.use('/user', router.user)
.use('/community', router.community)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  console.log(err);
});

// module.exports = app;
app.listen('3000',function(){
  console.log('server is running at 3000');
});
