const { getToken, getUser } = require('../../utils/auth');

Page({
  data: {
    today: '06-13 周四',
    loggedIn: false,
    nickname: '',
    activeType: 'all',
    tabs: [
      { key: 'all', label: '全部', count: 12 },
      { key: 'feed', label: '喂食', count: 4 },
      { key: 'walk', label: '遛弯', count: 4 },
      { key: 'clean', label: '清洁', count: 3 },
      { key: 'photo', label: '拍照', count: 1 }
    ],
    // 写死任务数据
    allTasks: [
      { id: 1, petIcon: '🐕', petName: '豆豆', breed: '金毛 · 标准间A03', type: '喂食', typeKey: 'feed', deadline: '08:30 前', done: false },
      { id: 2, petIcon: '🐈', petName: '团子', breed: '布偶 · 猫咪房C02', type: '清洁', typeKey: 'clean', deadline: '10:00 前', done: false },
      { id: 3, petIcon: '🐕', petName: '豆豆', breed: '金毛 · 标准间A03', type: '遛弯', typeKey: 'walk', deadline: '08:30', done: true, doneTime: '08:12', photos: 3 },
      { id: 4, petIcon: '🐩', petName: '可乐', breed: '比熊 · 标准间A01', type: '喂食', typeKey: 'feed', deadline: '08:30', done: true, doneTime: '08:05', photos: 2 }
    ],
    filteredTasks: []
  },

  onLoad() {
    this.applyFilter('all');
  },

  onShow() {
    const user = getUser();
    this.setData({
      loggedIn: !!getToken(),
      nickname: (user && user.nickname) || ''
    });
  },

  onTapTab(e) {
    this.applyFilter(e.currentTarget.dataset.key);
  },

  applyFilter(key) {
    const list = key === 'all'
      ? this.data.allTasks
      : this.data.allTasks.filter((t) => t.typeKey === key);
    this.setData({ activeType: key, filteredTasks: list });
  },

  onTapUser() {
    if (this.data.loggedIn) {
      wx.showToast({ title: '已登录：' + this.data.nickname, icon: 'none' });
    } else {
      wx.navigateTo({ url: '/pages/login/login' });
    }
  },

  onDone(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({ title: '任务 #' + id + ' 打卡（开发中）', icon: 'none' });
  }
});
