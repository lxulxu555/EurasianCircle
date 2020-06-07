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
        const type = "MyUser"
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('GetId',{id: id, type: type})
      }
    })
  },

  GoAttention : function(e){
    const type = e.currentTarget.dataset.type
    const id = this.data.user.user.id
    wx.navigateTo({
      url: './fans/fans',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('GetId', {id : id,type:type})
      }
    })
  },

  Complaint:function(){
    wx.navigateTo({
      url: './complaint/complaint',
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