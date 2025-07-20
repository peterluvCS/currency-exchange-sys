var express = require('express');
var router = express.Router();
const AuthService =  require('../services/AuthService');
/* GET users listing. */
// router.get('/', function(req, res, next) {

//   res.send('respond with a resource');
// });

// 用户注册
router.get('/www', function(req, res, next) {
  console.log('用户注册页面');
  
  res.send('respond with a resource');
  // try {
  //   const { username, password, email } = req.body;
  //   const user = AuthService.register(username, password, email);
  //   res.status(201).json({ 
  //     success: true,
  //     data: { id: user.id }
  //   });
  // } catch (error) {
  //   res.status(400).json({
  //     success: false,
  //     message: error.message
  //   });
  // }
});



module.exports = router;
