const { setToken, setUser } = require('../../utils/auth');
const { post } = require('../../utils/request');

Page({
  data: {
    username: '',
    password: '',
    loading: false
  },

  onUsername(e) {
    this.setData({ username: e.detail.value });
  },

  onPassword(e) {
    this.setData({ password: e.detail.value });
  },

  onLogin() {
    const { username, password } = this.data;
    if (!username || !password) {
      wx.showToast({ title: '请输入账号和密码', icon: 'none' });
      return;
    }
    if (this.data.loading) return;
    this.setData({ loading: true });

    post('/api/auth/login', { username, password })
      .then((data) => {
        setToken(data.token);
        setUser(data);
        wx.showToast({ title: '登录成功', icon: 'success' });
        setTimeout(() => {
          wx.navigateBack({
            fail: () => wx.reLaunch({ url: '/pages/index/index' })
          });
        }, 600);
      })
      .catch(() => {
        wx.showToast({ title: '登录失败', icon: 'none' });
      })
      .finally(() => {
        this.setData({ loading: false });
      });
  }
});
