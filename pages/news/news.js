const api = require("../../api/ajax")
Page({
    data:{
        comment:[],
        news:[]
    },

    getComment : function(){
        api._get("/reply/findAllByUser",{type : 'comment'}).then(res => {
            this.setData({
                comment : res.data
            })
        })
    },

    GoPost : function(e){
        wx.navigateTo({
            url: '/pages/home/recommend/postdetail/postdetail',
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('GetId', e.currentTarget.dataset.postid)
            }
        })
    },

    getNoReady : function(){
        api._get("/user").then(res => {
            this.setData({
                news:res.data
            })
        })
    },

    GoNewsType : function(e){
        const type = e.currentTarget.dataset.type
        wx.navigateTo({
            url: './newstype/newstype',
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('GetType',type)
            }
        })
    },

    onShow:function () {
        this.getComment()
        this.getNoReady()
    }
})