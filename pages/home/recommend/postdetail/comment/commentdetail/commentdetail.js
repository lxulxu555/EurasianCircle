Page({
    data : {
        CommentList : {},
        height : ''
    },

    getCommentList : function(){
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('CommentList', (data) => {
            wx.setNavigationBarTitle({
                title: data.replyList.length + '条回复'
            })
            this.setData({
                CommentList :data
            })
        })
    },

    onLoad: function () {
        this.getCommentList()
        this.setData({
            height: wx.getSystemInfoSync().windowHeight,
        })
    },
})