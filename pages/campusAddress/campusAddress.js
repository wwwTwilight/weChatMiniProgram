Page({
  data: {
    // 可以在这里添加需要的数据
  },

  submitForm(e) {
    const formData = e.detail.value;
    console.log('表单数据：', formData);
    
    // 这里可以添加表单验证逻辑
    
    // 发送数据到服务器的示例
    wx.request({
      url: 'your-api-endpoint',
      method: 'POST',
      data: formData,
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