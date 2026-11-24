const { get, post } = require('../../utils/request');

const STATUS_TEXT = {
  PENDING_PAY: '待支付',
  BOOKED: '已预约',
  IN_SERVICE: '服务中',
  COMPLETED: '已完成',
  CANCELLED: '已取消'
};

Page({
  data: {
    orders: []
  },

  onShow() {
    this.load();
  },

  load() {
    get('/grooming/orders/all').then((orders) => {
      orders.forEach((o) => {
        o.statusText = STATUS_TEXT[o.status] || o.status;
      });
      this.setData({ orders });
    }).catch(() => {});
  },

  onSignIn(e) {
    const id = e.currentTarget.dataset.id;
    post(`/grooming/orders/${id}/sign-in`, {}).then(() => {
      wx.showToast({ title: '已签到', icon: 'success' });
      this.load();
    }).catch(() => {});
  },

  onComplete(e) {
    const id = e.currentTarget.dataset.id;
    post(`/grooming/orders/${id}/complete`, {}).then(() => {
      wx.showToast({ title: '已核销', icon: 'success' });
      this.load();
    }).catch(() => {});
  }
});
