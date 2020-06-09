Component({
    data:{
        imageArr:[]
    },

    properties:{
      images:String
    },

    methods:{
        getImages : function () {
            const {images} = this.data
            const imageArr = images.split(",")
            this.setData({
                imageArr
            })
        },

        LookImages: function (e) {
            wx.previewImage({
                current: e.currentTarget.dataset.image, // 当前显示图片的http链接
                urls: e.currentTarget.dataset.images // 需要预览的图片http链接列表
            })
        },
    },

    ready : function () {
        this.getImages()
    }
})