// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    goods: [
      { id: 1, title: 'iPhone 12 二手', price: 4000, image: '/images/iphone12.jpg', url: '/pages/list/list' },
      { id: 2, title: '沙发', price: 1500, image: '/images/sofa.jpg', url: '/pages/list/list' },
      { id: 3, title: '运动鞋', price: 200, image: '/images/shoes.jpg', url: '/pages/list/list' },
      { id: 4, title: '编程书籍', price: 80, image: '/images/book.jpg', url: '/pages/list/list' }
    ],
  }
})
