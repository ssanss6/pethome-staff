const { get, post } = require('../../utils/request');
const { getToken, getUser } = require('../../utils/auth');

Page({
  data: {
    today: '',
    loggedIn: false,
    nickname: '',
    activeType: 'all',
    tabs: [
      { key: 'all', label: '全部', count: 0 },
      { key: 'FEED', label: '喂食', count: 0 },
      { key: 'WALK', label: '遛弯', count: 0 },
      { key: 'CLEAN', label: '清洁', count: 0 },
      { key: 'PHOTO', label: '拍照', count: 0 }
    ],
    allTasks: [],
    filteredTasks: []
  },

  onLoad() {
    this.setData({ today: this.formatDate(new Date()) });
  },

  onShow() {
    const loggedIn = !!getToken();
    const user = getUser();
    this.setData({ loggedIn, nickname: (user && user.nickname) || '' });
    if (loggedIn) {
      this.loadTasks();
    }
  },

  formatDate(d) {
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  },

  loadTasks() {
    get(`/care/tasks?date=${this.data.today}`).then((tasks) => {
      const counts = { all: tasks.length, FEED: 0, WALK: 0, CLEAN: 0, PHOTO: 0 };
      tasks.forEach((t) => {
        if (counts[t.taskType] !== undefined) {
          counts[t.taskType]++;
        }
      });
      const tabs = this.data.tabs.map((tab) => ({ ...tab, count: counts[tab.key] }));
      this.setData({ allTasks: tasks, tabs });
      this.applyFilter(this.data.activeType);
    }).catch(() => {});
  },

  onTapTab(e) {
    this.applyFilter(e.currentTarget.dataset.key);
  },

  applyFilter(key) {
    const list = key === 'all'
      ? this.data.allTasks
      : this.data.allTasks.filter((t) => t.taskType === key);
    this.setData({ activeType: key, filteredTasks: list });
  },

  onDone(e) {
    const id = e.currentTarget.dataset.id;
    wx.showLoading({ title: '打卡中' });
    post(`/care/tasks/${id}/complete`, { note: '' })
      .then(() => {
        wx.hideLoading();
        wx.showToast({ title: '已打卡', icon: 'success' });
        this.loadTasks();
      })
      .catch(() => wx.hideLoading());
  },

  onTapUser() {
    if (this.data.loggedIn) {
      wx.showToast({ title: '已登录：' + this.data.nickname, icon: 'none' });
    } else {
      wx.navigateTo({ url: '/pages/login/login' });
    }
  }
});
