// pages/test/test.js
var app = getApp();
Page({

  switchTab(event) {
    const page = event.currentTarget.dataset.page;
    wx.switchTab({
      url: `/pages/${page}/${page}`
    });
  },


  data: 
  {
    blossoms: [],
    // 分类数据
    categories: ['电子产品', '家具', '服装', '书籍', '运动器材', '杂物', '校园网设备'],
    
    // 商品数据
    goods: app.globalData.goods,
    // 轮播图数据
    showList : [
      { id: 1, title: '图书', image: '/assets/image/book.jpg' },
      { id: 2, title: '本人', image: '/assets/image/shoes.jpg' },
      { id: 3, title: '未花', image: '/assets/image/mika.jpg' }
    ],
    
    // 搜索输入框的值
    searchValue: '',

    searchInputColor: '',

    searchInputShadow: ''
  },

  onSearchInput(event) 
  {
    this.setData({
      searchValue: event.detail.value
    });
    console.log("搜索框内容：", this.data.searchValue);
  },

  onSearchFocus(event)
  {
    this.setData({
      searchInputColor: '#F5F5F5'
    });
    this.setData({
      searchInputShadow: '13px 13px 10px #969696, -13px -13px 10px #ffffff;'
    });
    console.log("搜索框获得焦点");
  },

  onSearchBlur(event)
  {
    this.setData({
      searchInputColor: '#ccc'
    });
    this.setData({
      searchInputShadow: 'inset 2px 5px 10px rgba(0,0,0,0.3)'
    });
    console.log("搜索框获得焦点");
  },

  onSearchTap() 
  {
    const searchValue = this.data.searchValue;
    if (searchValue) {
      wx.showToast({
        title: '搜索功能待完成',
        icon: 'none'
      });
    }
    console.log("点击了搜索按钮");
  },

  // 处理分类导航点击事件
  onCategoryTap(event) 
  {
    const category = event.currentTarget.dataset.category;
    wx.showToast({
      title: `你点击了分类: ${category}`,
      icon: 'none'
    });
    
    // 这里可以实现根据分类加载相应商品的逻辑
  },

  toItemDetail(event) 
  {
    var url = event.currentTarget.dataset.url;
    var image = event.currentTarget.dataset.image;
    var price = event.currentTarget.dataset.price;
    var title = event.currentTarget.dataset.title;
    url += `?image=${image}&price=${price}&title=${title}`;
    console.log("url:", url);
    wx.navigateTo({
      url: url,
    
      success: function(res) {
        console.log("跳转成功");
      },
    
      fail: function(res) {
        console.log("跳转失败");
      },
    
      complete: function(res) {
        console.log("跳转结束");
      },
    
     })
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

  },
  onLoad: function() {
    const blossoms = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: 10 + Math.random() * 20,
      left: Math.random() * 100,
      animationDuration: 5 + Math.random() * 10,
      animationDelay: Math.random() * 5
    }));
    this.setData({ blossoms });
  }
})