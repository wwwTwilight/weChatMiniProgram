Page({
  data: {
    items: []  // 用于存储物品信息的数组
  },

  onLoad: function() {
    // 物品数据
    this.setData({
      items: [
        {
          image: '/assets/image/1.png', 
          name: '物品1',
          price: 100,
          isSold: true,
          sellerId: 'seller1' 
        },
        {
          image: '/assets/image/1.png', 
          name: '物品按啊发发',
          price: 150,
          isSold: true,
          sellerId: 'seller2' 
        },
        {
          image: '/assets/image/1.png',  
          name: '物品3',
          price: 200,
          isSold: false,
          sellerId: 'seller3' 
        }
      ]
    });

    // 根据 isSold 字段设置状态
    this.updateItemStates();
  },

  updateItemStates: function() {
    const updatedItems = this.data.items.map(item => {
      return {
        ...item,
        state: item.isSold ? '已交易' : '未交易'  
      };
    });
    this.setData({
      items: updatedItems
    });
  },

  confirmContactSeller: function(event) {
    const sellerId = event.currentTarget.dataset.seller; // 获取卖家ID
    wx.showModal({
      title: '确认联系卖家',
      content: '您确定要联系卖家吗？',
      success: (res) => {
        if (res.confirm) {
          // 确认联系卖家，跳转到聊天界面
          wx.navigateTo({
            url: `/pages/chat/chat?sellerId=${sellerId}` // 跳转到聊天界面
          });
        }
      }
    });
  }
});
