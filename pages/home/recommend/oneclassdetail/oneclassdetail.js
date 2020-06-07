const api = require("../../../../api/ajax")
Page({
    data: {
        navH: '',
        search: '',
        ClassList: [],
        IdData:{},
        type:'',
        matterId:''
    },

    GetHeight: function (e) {
        this.setData({
            navH: e.detail.navH
        })
    },

    AddHotPost : function(){
        const matterId = this.data.matterId
        wx.navigateTo({
            url: '/pages/user/sendpost/sendpost',
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('GetId', {matterId: matterId,type:'Hotmatter'})
            }
        })
    },

    GetClassId: function () {
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('GetId', (data) => {
            this.setData({
                IdData :data
            })

        })
    },

    GetClassList:function(searchName){
        const data = this.data.IdData
        const type = data.type
        const id  = data.id
        const classifyId = id
        const matterId = id
        api._get("/post/findByClassifyOrMatter",
            type === 'class'? {classifyId,searchName} : {matterId,searchName}).then(res => {
            this.setData({
                ClassList: res.data.data,
                type:type,
                matterId:matterId
            })

        })
    },


    selectResult: function (e) {
        const searchName = e.detail
        this.GetClassList(searchName)
    },

    GoPostDetail : function(e){
        wx.navigateTo({
            url: '../postdetail/postdetail',
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('GetId', e.currentTarget.dataset.postid)
            }
        })
    },


    onLoad: function () {
        this.GetClassId()
        setTimeout(() => {
            this.GetClassList('')
        },100)
    }
})
