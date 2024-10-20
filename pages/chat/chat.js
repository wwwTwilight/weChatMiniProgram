const app = getApp()
const utils = require("../../utils/util")

Page({
    data: {
        inputValue: "",
        time: 0,
        isOrderConfirmed: false,
        isFriendOrderConfirmed: false,
        orderStatus: '未下单',
        userRole: '' // 'buyer' or 'seller'
    },

    onLoad: function (options) {
        this.setData({
            recordId: options.id,
            userInfo: app.globalData.userInfo
        })
        this.getChatList()
        this.getFriendInfo()
        this.determineUserRole()
    },

    onShow: function (options) {
        this.getChatList()
    },

    publishMessage(){
        if (this.data.inputValue == "") {
            wx.showToast({
                icon: "none",
                title: '不能发送空消息',
            })
            return;
        }
        var that = this;
        wx.cloud.database().collection('chat_record').doc(that.data.recordId).get({
            success(res) {
                console.log(res)
                var record = res.data.record;

                var msg = {}
                msg.id = app.globalData.userInfo._id
                msg.text = that.data.inputValue
                msg.time = utils.formatTime(new Date())

                console.log(msg)
                record.push(msg)
                console.log(record)
                wx.cloud.database().collection('chat_record').doc(that.data.recordId).update({
                    data: {
                        record: record
                    },
                    success(res) {
                        console.log(res)
                        wx.showToast({
                          title: '发送成功',
                        })

                        that.getChatList(),
                        that.setData({
                            inputValue: ''
                        })
                    }
                })
            }
        })
    },

    handleInput(e) {
        clearTimeout(this.data.time)
        var that = this;
        this.data.time = setTimeout(() => {
            that.getInputValue(e.detail.value)
        }, 200)
    },

    getInputValue(value) {
        this.setData({
            inputValue: value
        })
    },

    getChatList() {
        var that = this;
        wx.cloud.database().collection('chat_record').doc(that.data.recordId).watch({
            onChange: function(snapshot) {
                that.setData({
                    chatList: snapshot.docs[0].record
                })
                that.setData({
                    scrollLast: "toView"
                })
                that.checkOrderConfirmation()
            },
            onError: function(err){
                console.log(err)
            }
        })
    },

    getFriendInfo() {
        var that = this;
        var friend_account_id, friend_avatarUrl;
        wx.cloud.database().collection('chat_record').doc(that.data.recordId).get({
            success(res) {
                console.log(res)
                if (that.data.userInfo._id == res.data.userA_id){
                    friend_account_id = res.data.userB_account_id;
                    friend_avatarUrl = res.data.userB_avatarUrl;
                    console.log("A")
                } else {
                    console.log("B")
                    friend_account_id = res.data.userA_account_id
                    friend_avatarUrl = res.data.userA_avatarUrl
                }
                wx.setNavigationBarTitle({
                    title: friend_account_id
                })
                that.setData({
                    friend_account_id: friend_account_id,
                    friend_avatarUrl: friend_avatarUrl
                })
            }
        })
    },

    determineUserRole() {
        const that = this
        wx.cloud.database().collection('chat_record').doc(that.data.recordId).get({
            success(res) {
                const userRole = that.data.userInfo._id === res.data.buyerId ? 'buyer' : 'seller'
                that.setData({ userRole })
            }
        })
    },

    confirmOrder() {
        var that = this;
        wx.showModal({
            title: '确认下单',
            content: '您确定要下单购买这个物品吗？',
            success(res) {
                if (res.confirm) {
                    const updateData = {}
                    updateData[`${that.data.userRole}OrderConfirmed`] = true

                    wx.cloud.database().collection('chat_record').doc(that.data.recordId).update({
                        data: updateData,
                        success() {
                            that.setData({
                                isOrderConfirmed: true
                            })
                            wx.showToast({
                                title: '已确认下单',
                                icon: 'success'
                            })
                            that.checkOrderConfirmation()
                        }
                    })
                }
            }
        })
    },

    checkOrderConfirmation() {
        const that = this
        wx.cloud.database().collection('chat_record').doc(that.data.recordId).get({
            success: res => {
                const { buyerOrderConfirmed, sellerOrderConfirmed } = res.data
                that.setData({
                    isFriendOrderConfirmed: that.data.userRole === 'buyer' ? sellerOrderConfirmed : buyerOrderConfirmed
                })
                if (that.data.isOrderConfirmed && that.data.isFriendOrderConfirmed) {
                    that.setData({ orderStatus: '已下单' })
                    wx.showToast({
                        title: '订单已完成',
                        icon: 'success',
                        duration: 2000
                    })
                    // 这里可以添加订单完成后的其他逻辑，比如跳转到订单详情页
                }
            }
        })
    }
})