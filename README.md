# currency-exchange-sys
好的，下面是一个简单明了的 **README.md**，适合团队成员快速上手你的 Express skeleton：

# **Express.js Skeleton 使用说明**

这是一个基于 **express-generator** 初始化的 Node.js 项目骨架。

## **目录结构**

```
├── app.js            // 应用主文件
├── bin/www           // 启动入口
├── routes/           // 路由文件
├── views/            // 视图模板（默认使用 Pug，可自行修改）
├── public/           // 静态资源
├── package.json      // 项目配置与依赖
```

---

## **安装依赖**

确保你的机器上安装了 **Node.js (建议版本 >= 18)**。

```bash
npm install
```

---

## **启动项目**

运行以下命令启动本地开发服务器：

```bash
npm start
```

默认服务运行在：

```
http://localhost:3000
```

打开浏览器访问，看到 `Welcome to Express` 即表示运行成功。

---

## **可选：开发模式启动（自动重启）**

建议安装 `nodemon` 方便开发：

```bash
npm install -g nodemon
```

然后用：

```bash
nodemon
```

每次保存文件后会自动重启服务。

---

## **路由说明**

* `/` ：默认首页
* `/users` ：示例用户路由（可自行扩展）

---

## **修改模板引擎**

当前项目使用 **Pug** 作为模板引擎，文件在 `views/` 文件夹内。
如果想改成 **EJS** 或 **Handlebars**，可以在 `app.js` 里替换：

```js
app.set('view engine', 'pug');  // 改成 ejs / hbs 等
```

---

## **团队开发建议**

* 所有新功能请在 `routes/` 和 `controllers/` 中分层管理（可自行创建 `controllers` 文件夹）
* 所有依赖变更请同步更新 `package.json`
* 代码提交前建议格式化，保持风格一致（可以加 Prettier）