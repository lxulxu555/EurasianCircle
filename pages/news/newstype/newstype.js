const api = require('../../../api/ajax')
Page({
    data:{
        data:[],
        type:''
    },

    getData : function(){
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('GetType', (data) => {
            api._get('/reply/findAllByUser',{type : data}).then(res => {
                this.setData({
                    data:res.data,
                    type:data
                })
            })
        })
    },

    GoMyUser:function(e){
        wx.navigateTo({
            url:"/pages/user/myuser/myuser",
            success: (res) => {
                const id = e.currentTarget.dataset.userid
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('GetId',{id: id})
            }
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

    onReady:function () {
        this.getData()
    }

})