
// 导入mysql2模块
const mysql = require('mysql2');

// 创建连接池（推荐生产环境使用）
const pool = mysql.createPool({
  host: 'localhost',    // 数据库地址
  user: 'root',         // 数据库用户名
  password: 'root',   // 数据库密码
  database: 'data',   // 数据库名
  waitForConnections: true,
  connectionLimit: 10,  // 连接池最大连接数
  queueLimit: 0
});

// 导出Promise接口（支持async/await）
module.exports = pool.promise();
