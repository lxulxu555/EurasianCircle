const api = require("../../../../api/ajax")
Page({
    data: {
        navH: '',
        search: '',
        images: ['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=595770973,897086183&fm=26&gp=0.jpg', 'http://img5.imgtn.bdimg.com/it/u=2969407735,1014016186&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=595770973,897086183&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=595770973,897086183&fm=26&gp=0.jpg'],
        ClassList: []
    },

    GetHeight: function (e) {
        this.setData({
            navH: e.detail.navH
        })
    },

    GetClassId: function () {
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('GetId', (data) => {
            const type = data.type
            const id  = data.id
            const classifyId = id
            const matterId = id
            api._get("/post/findByClassifyOrMatter",
                type === 'class'? {classifyId} : {matterId}).then(res => {
                this.setData({
                    ClassList: res.data.data
                })
            })
        })
    },


    selectResult: function (e) {
        console.log(e.detail)
    },

    LookImages: function (e) {
        wx.previewImage({
            current: e.currentTarget.dataset.image, // 当前显示图片的http链接
            urls: e.currentTarget.dataset.images // 需要预览的图片http链接列表
        })
    },

    onLoad: function () {
        this.GetClassId()
    }
})
