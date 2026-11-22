const { BASE_URL } = require('../config/api');
const { getToken, clearToken } = require('./auth');

function request(options) {
  return new Promise((resolve, reject) => {
    const token = getToken();
    wx.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: 'Bearer ' + token } : {})
      },
      success(res) {
        const body = res.data;
        if (body && body.code === 0) {
          resolve(body.data);
        } else if (body && body.code === 401) {
          clearToken();
          wx.showToast({ title: '请先登录', icon: 'none' });
          reject(body);
        } else {
          wx.showToast({ title: (body && body.message) || '请求失败', icon: 'none' });
          reject(body || res);
        }
      },
      fail(err) {
        wx.showToast({ title: '网络异常，请检查后端是否启动', icon: 'none' });
        reject(err);
      }
    });
  });
}

module.exports = {
  get: (url, data) => request({ url, method: 'GET', data }),
  post: (url, data) => request({ url, method: 'POST', data })
};
