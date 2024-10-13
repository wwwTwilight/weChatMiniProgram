// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */


  data: {
    // 模拟分类数据
    categories: ['电子产品', '家具', '服装', '书籍', '运动器材', '杂物', '校园网设备'],
    
    // 模拟商品数据
    goods: [
      { id: 1, title: 'iPhone 12 二手', price: 4000, image: '/images/iphone12.jpg' },
      { id: 2, title: '沙发', price: 1500, image: '/images/sofa.jpg' },
      { id: 3, title: '运动鞋', price: 200, image: '/images/shoes.jpg' },
      { id: 4, title: '编程书籍', price: 80, image: '/images/book.jpg' }
    ],

    showList : [
      { id: 1, title: '图书', image: '/images/crystal.png' },
      { id: 2, title: '本人', image: '/images/head.jpg' },
      { id: 3, title: '未花', image: '/images/mika.jpg' }
    ],
    
    // 搜索输入框的值
    searchValue: ''
  },

  onSearchInput(event) {
    this.setData({
      searchValue: event.detail.value
    });
  },

  onSearchTap() {
    const searchValue = this.data.searchValue;
    if (searchValue) {
      wx.showToast({
        title: '搜索功能未实现',
        icon: 'none'
      });
      // 在这里你可以实现搜索逻辑，过滤商品列表
    }
  },

  // 处理分类导航点击事件
  onCategoryTap(event) {
    const category = event.currentTarget.dataset.category;
    wx.showToast({
      title: `你点击了分类: ${category}`,
      icon: 'none'
    });
    
    // 这里可以实现根据分类加载相应商品的逻辑
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})