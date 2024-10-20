Page({
  data: {
    searchText: '',
    contacts: [
      { name: '联系人1', lastMessage: '你好！', unreadCount: 2, avatarUrl: '/assets/image//testuser.png'},
      { name: '联系人2', lastMessage: '今天天气不错', unreadCount: 0, avatarUrl: '/assets/image//testuser.png' },
      { name: '联系人3', lastMessage: '晚上有空吗？', unreadCount: 1, avatarUrl: '/assets/image//testuser.png' },
      { name: '联系人4', lastMessage: '记得带伞哦', unreadCount: 3, avatarUrl: '/assets/image//testuser.png' },
      { name: '联系人5', lastMessage: '周末一起出去玩吧', unreadCount: 0, avatarUrl: '/assets/image//testuser.png' },
    ],
    filteredContacts: []
  },

  onLoad() {
    this.setData({
      filteredContacts: this.data.contacts
    });
  },

  onSearchInput(e) {
    const searchText = e.detail.value.toLowerCase();
    this.setData({
      searchText: searchText,
      filteredContacts: this.data.contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchText) || 
        contact.lastMessage.toLowerCase().includes(searchText)
      )
    });
  },

  onContactTap(event) {
    const index = event.currentTarget.dataset.index;
    const selectedContact = this.data.filteredContacts[index];
    wx.navigateTo({
      url: `/pages/chat/chat?contactName=${selectedContact.name}`
    });
  },

  onShareAppMessage() {
    return {
      title: '我的消息列表',
      path: '/pages/index/index',
      imageUrl: '/assets/images/share-image.jpg'
    };
  }
});
