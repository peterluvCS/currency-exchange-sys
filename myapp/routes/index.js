var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();   
const bcrypt = require('bcrypt');   // hash 加密算法
const db = require('../db'); // 引入数据库连接池
require('dotenv').config();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 用户注册
router.post('/register', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        
        // 检查用户名和邮箱唯一性
        const [existingUsers] = await db.query(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, email]
        );
        
        if (existingUsers.length > 0) {
            const error = existingUsers.some(u => u.username === username) ? 
                '用户名已被使用' : '电子邮箱已被注册';
            return res.status(400).json({ error });
        }
        
        // 密码加密
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // 创建新用户
        const [result] = await db.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        
        req.flash('success', '注册成功！');
        res.redirect('/login');
        
    } catch (err) {
        console.error('注册错误:', err);
        res.status(500).json({ error: '服务器内部错误' });
    }
});

// 用户登录
router.post('/login', async (req, res, next) => {

  try {
    const { username, email, password } = req.body;
    
    // 1. 验证必填字段
    if (!username || !email || !password) {
      return res.status(400).json({code: 1, error: '所有字段均为必填' });
    }

    // 2. 查询用户
    const [existingUsers] = await db.query(
          'SELECT * FROM users WHERE username = ? and email = ?',
          [username, email]
        );
    if (existingUsers.length == 0) {
      return res.status(401).json({code: 1, error: '用户名、邮箱或者密码错误' });
    }

    // 3. 验证密码
    const isMatch = await bcrypt.compare(password, existingUsers[0].password_hash);
    if (!isMatch) {
      return res.status(401).json({code: 1, error: '用户名、邮箱或者密码错误' });
    }

    console.log(process.env.JWT_SECRET);
    // 4. 生成JWT
    const token = jwt.sign(
      { 
        userId: existingUsers[0].user_id,
        username: existingUsers[0].username,
        role: existingUsers[0].role  
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 5. 返回响应（排除密码字段）
    return res.json({ 
      code: 0,
      token : token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '服务器错误' });
  }
});

module.exports = router;
