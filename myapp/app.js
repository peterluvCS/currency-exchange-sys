var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authMiddleware = require('./Middleware/authentication');
var app = express();



// 中间件配置
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(['/register'], authMiddleware);

// 注册页面路由
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// 登录页面路由
// 修改后的登录路由
app.get('/login', (req, res) => {
  const successMsg = req.flash('success')[0];
  const filePath = path.join(__dirname, 'public', 'login.html');
  
  if(successMsg) {
    // 动态注入脚本到HTML文件
    const fs = require('fs');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err) return res.status(500).send('Error loading login page');
      
      const modifiedHtml = data.replace(
        '</head>', 
        `<script>alert('${successMsg}')</script></head>`
      );
      res.send(modifiedHtml);
    });
  } else {
    res.sendFile(filePath);
  }
});


// app.use('/register', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
