Page({
    data: {
        navH : '',
        search : '',
        images:  ['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=595770973,897086183&fm=26&gp=0.jpg','http://img5.imgtn.bdimg.com/it/u=2969407735,1014016186&fm=26&gp=0.jpg','https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=595770973,897086183&fm=26&gp=0.jpg','https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=595770973,897086183&fm=26&gp=0.jpg']

},

    GetHeight: function(e){
        this.setData({
            navH : e.detail.navH
        })
    },

    selectResult:  function (e) {
        console.log(e.detail)
    },

    LookImages : function (e) {
        wx.previewImage({
            current: e.currentTarget.dataset.image, // 当前显示图片的http链接
            urls: e.currentTarget.dataset.images // 需要预览的图片http链接列表
        })
    }
})
