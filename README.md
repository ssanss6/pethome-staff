# frontend-staff（员工小程序）

员工端微信小程序：**微信原生开发（WXML/WXSS/TypeScript）+ 微信开发者工具**。

## 技术栈

- 微信原生小程序 + TypeScript
- UI 组件库：Vant Weapp 或 TDesign 小程序版
- 请求层：封装 `wx.request`

## 页面规划

- 今日任务（照护打卡/拍照）、入住登记、洗护工作台（签到/核销）、离店办理、照片上传

## 登录

- 账号密码登录：后台自建账号 → 后端 `POST /api/auth/login`

> 待后端联调时初始化工程。
