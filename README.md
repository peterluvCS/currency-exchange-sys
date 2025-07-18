# **Express.js Skeleton 项目说明**

本项目是基于 **express-generator** 初始化的 Node.js 全栈项目模板。
主要用于搭建基础的 **后端 API 服务 + 前端模板渲染**。

---

## **技术栈**

* **Node.js**：服务器运行环境
* **Express.js**：Web 框架（用于后端 API 和页面渲染）
* **Pug (默认)**：前端模板引擎（可替换为 EJS、Handlebars）
* **静态文件支持**：前端静态资源（如 HTML/CSS/JS 文件）

---

## **目录结构 & 说明**

```
myapp/
├── app.js              // 应用入口（后端）
├── bin/www             // 启动脚本（后端）
├── routes/             // 路由（后端）
│   ├── index.js        // 首页路由
│   └── users.js        // 用户相关路由
├── views/              // 模板文件（前端页面，默认 Pug）
│   └── index.pug
│   └── error.pug
├── public/             // 前端静态文件
│   ├── images/         // 图片资源
│   ├── javascripts/    // JS 文件（浏览器运行）
│   └── stylesheets/    // CSS 文件
├── package.json        // 项目依赖与脚本
└── README.md           // 项目说明
```

---

## **前端与后端划分**

| 部分         | 说明                   | 文件位置               |
| ---------- | -------------------- | ------------------ |
| **后端逻辑**   | API接口、路由、业务逻辑        | `app.js`、`routes/` |
| **前端页面**   | 通过 Pug 模板渲染的 HTML 页面 | `views/`           |
| **前端静态资源** | JS、CSS、图片（浏览器直接访问）   | `public/`          |

---

## **安装依赖**

确保你的电脑已安装 Node.js（推荐版本 ≥ 18）

```bash
npm install
```

---

## **运行项目**

### **本地启动**

```bash
npm start
```

默认监听：

```
http://localhost:3000
```

---

## **前端访问**

直接在浏览器打开：

```
http://localhost:3000
```

你会看到一个欢迎页面：

```
Welcome to Express
```

---

## **后端接口（示例）**

### `GET /users`

返回示例用户数据，位于：

```
routes/users.js
```

你可以用 Postman 或 curl 访问：

```bash
curl http://localhost:3000/users
```

---

## **开发建议**

### **新功能开发**

* **新增页面**
  在 `views/` 里添加 `.pug` 文件，并在 `routes/` 里配置对应路由。

* **新增 API**
  在 `routes/` 目录新建 `.js` 文件，并注册路由。

* **静态资源管理**
  把前端的 JS、CSS 放在 `public/` 文件夹。

---

## **环境变量（可选）**

你可以创建 `.env` 文件用于配置端口、数据库等，例如：

```
PORT=3000
```

在 `app.js` 中用 `process.env.PORT` 读取。

---

## **推荐开发工具**

* **VS Code**（推荐安装 ESLint、Prettier 插件）
* **Postman / curl**（测试接口）

---

## **部署**

1. 服务器安装 Node.js
2. 上传代码 & 安装依赖：

```bash
npm install
npm start
```

3. 可使用 **PM2** 进行生产环境管理：

```bash
npm install -g pm2
pm2 start bin/www
```