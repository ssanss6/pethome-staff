// 员工登录态管理
const TOKEN_KEY = 'pethome_staff_token';
const USER_KEY = 'pethome_staff_user';

function getToken() {
  return wx.getStorageSync(TOKEN_KEY) || '';
}

function setToken(token) {
  wx.setStorageSync(TOKEN_KEY, token);
}

function clearToken() {
  wx.removeStorageSync(TOKEN_KEY);
  wx.removeStorageSync(USER_KEY);
}

function getUser() {
  return wx.getStorageSync(USER_KEY) || null;
}

function setUser(user) {
  wx.setStorageSync(USER_KEY, user);
}

module.exports = { getToken, setToken, clearToken, getUser, setUser };
