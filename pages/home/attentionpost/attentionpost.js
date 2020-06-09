
const api = require('../../../api/ajax.js')

Component({
    data: {
        data:[]
    },

    methods:{
        getData:function () {
            api._get("/post/findByFansUserId").then(res =>{
                this.setData({
                   data:res.data.data
                })
            })
        },
        GoPostDetail : function(e){
            wx.navigateTo({
                url: '../home/recommend/postdetail/postdetail',
                success: function (res) {
                    // 通过eventChannel向被打开页面传送数据
                    res.eventChannel.emit('GetId', e.currentTarget.dataset.postid)
                }
            })
        },
    },



    ready:function () {
        this.getData()
    }
})