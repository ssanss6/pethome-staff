# pethome-staff（员工小程序）

宠物寄养洗护预约管理平台 · 员工端微信小程序（微信原生 + Vant Weapp）

## 技术栈

- 微信原生小程序（JS）
- Vant Weapp 组件库

## 已实现功能

- 账号密码登录：→ 后端 `POST /api/auth/login`
- 今日照护任务：接真实接口 `GET /api/care/tasks?date=`，类型筛选 + 打卡（含照片）
- 洗护工作台：接真实接口 `GET /api/grooming/orders/all`，到店签到 + 完成核销

## 目录

```
frontend-staff\
├── app.js / app.json / app.wxss
├── config\api.js               # 后端地址 http://127.0.0.1:8080
├── utils\request.js / auth.js  # 请求封装 + 登录态
└── pages\
    ├── index（今日任务）  groom（洗护工作台）  login（账号密码登录）
```

## 运行

1. 微信开发者工具 → 导入本目录；
2. 勾选「不校验合法域名」；
3. 启动后端后登录。默认账号：`staff01 / 123456`（演示照护员，见后端 DataInitializer）。

## 待办

- 入住登记、离店办理页面（后端接口已就绪，页面待接）
