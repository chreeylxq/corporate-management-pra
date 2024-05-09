var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let adminUserRouter = require('./routes/admin/UserRouter');
let adminNewsRouter = require('./routes/admin/NewsRouter');
let adminProductRouter = require('./routes/admin/ProductsRouter');
let webNewsRouter = require('./routes/web/NewsRouter');
let webProductRouter = require('./routes/web/ProductRouter');

let middleware = require('./utils/middle_config');
let jwt = require('./utils/JWT');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//web router
app.use(webNewsRouter);
app.use(webProductRouter)
app.use((req, res, next) => {
  // 判断是否是登录？
  if (req.url === '/adminapi/user/login') {  //是 next()
    next();
    return;
  }
  //判断token是否有效？
  let token = req.headers.authorization.split(' ')[1];
  if (token) {
    let payload = jwt.verify(token)
    if (payload) { //token 有效，生成新的token
      res.setHeader('Authorization', jwt.generate({ _id: payload._id, username: payload.username }));
      next();
    } else {
      res.status(401).json({
        code: -1,
        msg: 'token无效'
      })
    }
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(adminUserRouter);
app.use(adminNewsRouter);
app.use(adminProductRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
