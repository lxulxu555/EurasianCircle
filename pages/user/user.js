const utils = require('../../utils/util')
Page({

  data: {
    height : '',
    user:{}
  },

  GoSendPost : function(){
    wx.navigateTo({
      url: "./sendpost/sendpost",
    });
  },

  GoMyUser : function(){
    wx.navigateTo({
      url:"./myuser/myuser",
      success: (res) => {
        const id = this.data.user.user.id
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('GetId',id)
      }
    })
  },

  onLoad:function () {
    const user = utils.getUserInfo()
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
      user
    })
  }
})