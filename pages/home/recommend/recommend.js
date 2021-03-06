import util from "../../../utils/util";

const api = require('../../../api/ajax.js')

Component({
    data: {
        // 这里是一些组件内部数据
        initData: [],
    },



    methods: {
        // 这里是一个自定义方法
        OneClass: function () {
            api._get('/user/init').then(res => {
                this.setData({
                    initData: res.data
                })
            }).catch(e => {
                console.log(e)
            })
        },

        GoPostDetail: function (e) {
            wx.navigateTo({
                url: './recommend/postdetail/postdetail',
                success: function (res) {
                    // 通过eventChannel向被打开页面传送数据
                    res.eventChannel.emit('GetId', e.currentTarget.dataset.postid)
                }
            })
        },

        GoOneClassDetail: function (e) {
            wx.navigateTo({
                url: './recommend/oneclassdetail/oneclassdetail',
                success: function (res) {
                    const type = e.currentTarget.dataset.type
                    // 通过eventChannel向被打开页面传送数据
                    res.eventChannel.emit('GetId', {id: e.currentTarget.dataset.id, type: type})
                }
            })
        },

},

attached: function () {
    this.OneClass()
    wx.setNavigationBarTitle({
        title: '首页'
    })
    }
})


/*
// 一个页面多个请求
Promise.all([
  api.get('list'),
  api.get(`detail/${id}`)
]).then(result => {
  console.log(result)
}).catch(e => {
  console.log(e)
})*/