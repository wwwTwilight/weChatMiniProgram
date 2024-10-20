Page({
  data: {
    isLoggedIn: false,
    username: '',
    isModalVisible: false,
    newTrade: {
      name: '',
      price: '',
      category: '',
      address: '',
      phone: '',
      image: ''
    }
  },
  onLoad() {
    this.checkUserLogin();
  },
  checkUserLogin() {
    const userInfo = this.getUserInfo(); // 确保 getUserInfo 方法已定义
    if (userInfo) {
      this.setData({
        isLoggedIn: true,
        username: userInfo.username,
      });
    }
  },
  getUserInfo() {
    // 模拟用户信息
    return { username: '用户123' }; // 替换为实际获取用户信息的逻辑
  },
  navigateToLogin() {
    wx.navigateTo({ url: '/pages/login/login' });
  },
  navigateToMyTrades() {
    wx.navigateTo({ url: '/pages/myTrades/myTrades' });
  },
  navigateToMessages() {
    wx.navigateTo({ url: '/pages/message/message' });
  },
  navigateToCampusAddress() {
    wx.navigateTo({ url: '/pages/campusAddress/campusAddress' });
  },
  navigateToAbout() {
    wx.navigateTo({ url: '/pages/about/about' });
  },
  showModal() {
    this.setData({ isModalVisible: true });
  },
  hideModal() {
    this.setData({ isModalVisible: false });
  },
  handleInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({ [`newTrade.${field}`]: e.detail.value });
  },
  chooseImage() {
    wx.chooseMedia({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({ 'newTrade.image': res.tempFilePaths[0] });
      }
    });
  },
  submitTrade() {
    const { newTrade } = this.data;
    console.log('提交新交易:', newTrade);
    this.setData({
      newTrade: {
        name: '',
        price: '',
        category: '',
        address: '',
        phone: '',
        image: ''
      },
      isModalVisible: false
    });
    wx.request({
      url: 'your-api-endpoint', // 替换为您的 API 端点
      method: 'POST',
      data: newTrade,
      success(res) {
        console.log('提交成功', res);
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail(err) {
        console.error('提交失败', err);
        wx.showToast({
          title: '提交失败',
          icon: 'error',
          duration: 2000
        });
      }
    });
  }
});
