const api = require('../../../api/ajax')
Page({
    data: {
        user:{},
        type : '',
        follow:''
    },

    back:function(){
        wx.navigateBack({
            delta: 1
        })
    },

    GoAttention : function(e){
        const type = e.currentTarget.dataset.type
        const id = this.data.user.user.id
        wx.navigateTo({
            url: '../fans/fans',
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('GetId', {id : id,type:type})
            }
        })
    },

    follow : function(){
        const {user} = this.data
        api._post("/fans/save",{userId : user.user.id}).then(res => {
            this.setData({
                follow : res.msg === '收藏成功' ? '取消关注' : '关注'
            })
        })
    },

    JudgeFollow : function(){
        const toUserId = this.data.user.user.id
        api._get("/fans/checkFans",{toUserId}).then(res => {
            this.setData({
                follow : res === true ? '取消关注' : '关注'
            })
        })
    },

    GoPostDetail : function(e){
        wx.navigateTo({
            url: '/pages/home/recommend/postdetail/postdetail',
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('GetId', e.currentTarget.dataset.postid)
            }
        })
    },

    getUserInfo: function () {
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('GetId', (data) => {
            api._get("/post/findByUserId/",{id : data.id}).then(res =>{
                this.setData({
                    user:res.data,
                    type : data.type !== 'MyUser'
                },() => this.JudgeFollow())
            })
       })
    },

    onLoad: function () {
        this.getUserInfo()
    }
})