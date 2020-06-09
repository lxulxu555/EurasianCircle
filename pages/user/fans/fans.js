const api = require('../../../api/ajax')
Component({
    data:{
        data:[],
        height:'',
    },
    properties:{

    },

    methods:{

        getData : function () {
            const eventChannel = this.getOpenerEventChannel()
            eventChannel.on('GetId', (data) => {
                const type = data.type
                const userId = data.id
                const fansId = data.id
                api._get("/fans/findFansToUser",type === 'attention' ? {fansId} : {userId}).then(res =>{
                    this.setData({
                        data:res.data,
                    })
                })
            })

        },

        GoMyUser:function(e){
            wx.navigateTo({
                url:"/pages/user/myuser/myuser",
                success: (res) => {
                    const id = e.currentTarget.dataset.id
                    // 通过eventChannel向被打开页面传送数据
                    res.eventChannel.emit('GetId',{id: id})
                }
            })
        },
    },



    ready:function () {
        this.setData({
            height: wx.getSystemInfoSync().windowHeight,
        })
        this.getData()
    }
})