
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res, next) => {
  
  const token = req.cookies.authToken;
  console.log('Token:', token);
  if (!token) {
    return res.redirect('/login'); // 如果没有Token，重定向到登录页面
  }

  // 2. 验证Token有效性
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        return res.redirect('/login'); // 如果没有Token，重定向到登录页面
    //   return res.status(403).json({ 
    //     code: 403, 
    //     message: err.name === 'TokenExpiredError' ? 
    //             '登录已过期' : '无效令牌' 
    //   });
    }
    
    // 3. 将用户信息挂载到请求对象
    req.user = decoded;
    next();
  });
};