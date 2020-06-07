const api = require('../../../../api/ajax.js')
const App = getApp();
Page({
    data: {
        navH: '',
        PostDetail: {},
        images: [],
        commentList: [],
        follow:''
    },


    getPostDetail: function () {
        // 监听acceptDataFromOpenerPage事件，获取UpdateComment上一页面通过eventChannel传送到当前页面的数据
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('GetId', (data) => {
            api._get('/post/' + data).then(res => {
                /*切割字符串*/
                const images = res.data.imagesUrl.split(",")
                this.setData({
                    PostDetail: res.data,
                    commentList:res.data.commentList,
                    images
                },() => {
                    this.JudgeFollow()
                })
            })
        })
    },

    GoMyUser:function(){
        wx.navigateTo({
            url:"/pages/user/myuser/myuser",
            success: (res) => {
                const id = this.data.PostDetail.user.id
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('GetId',{id: id})
            }
        })
    },

    follow : function(){
        const userId = this.data.PostDetail.user.id
        api._post("/fans/save",{userId : userId}).then(res => {
            this.setData({
                follow : res.msg === '收藏成功' ? '取消关注' : '关注'
            })
        })
    },

    JudgeFollow : function(){
        const toUserId =  this.data.PostDetail.user.id
        api._get("/fans/checkFans",{toUserId}).then(res => {
            this.setData({
                follow : res === true ? '取消关注' : '关注'
            })
        })
    },

    UpdateCommentDetail: function () {
        const postId = this.data.PostDetail.id
        const sortName = 'number'
        api._get('/comment/findBySort/',{postId,sortName}).then(res => {
            this.setData({
                commentList: res.data,
            })
        })
    },

    GetHeight: function (e) {
        this.setData({
            navH: e.detail.navH
        })
    },

    onReady: function () {
        this.getPostDetail()
    },

    LookImages: function (e) {
        wx.previewImage({
            current: e.currentTarget.dataset.image, // 当前显示图片的http链接
            urls: e.currentTarget.dataset.images // 需要预览的图片http链接列表
        })
    }

})
