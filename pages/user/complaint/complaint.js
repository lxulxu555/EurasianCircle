Page({
    data:{

    },

    SendComplaint:function () {
        wx.showToast({
            title: '提交成功！感谢！',
            icon: 'success',
            duration: 2000
        })
        wx.reLaunch({
            url: '/pages/home/home'
        })
    }
})