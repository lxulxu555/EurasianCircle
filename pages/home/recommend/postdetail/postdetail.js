const api = require('../../../../api/ajax.js')
const App = getApp();
Page({
    data: {
        navH : '',
        PostDetail : {},
        images : [],
        PostId : ''
    },

    a :function(){
      this.onLoad()
    },

    getId : function(){
        // 监听acceptDataFromOpenerPage事件，获取UpdateComment上一页面通过eventChannel传送到当前页面的数据
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('GetId', (data) => {
                this.setData({
                    PostId : data
                })
            })
    },

    getPostDetail: function () {
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
            api._get('/post/' + this.data.PostId).then(res =>{
                /*切割字符串*/
                const images = res.data.imagesUrl.split(",")
                this.setData({
                    PostDetail : res.data,
                    images
                })
            })
    },

    GetHeight: function(e){
        this.setData({
            navH : e.detail.navH
        })
    },

    onLoad: function () {
        this.getId()
    },

    onReady : function(){
        this.getPostDetail()
    },

    LookImages : function (e) {
        wx.previewImage({
            current: e.currentTarget.dataset.image, // 当前显示图片的http链接
            urls: e.currentTarget.dataset.images // 需要预览的图片http链接列表
        })
    }

})
