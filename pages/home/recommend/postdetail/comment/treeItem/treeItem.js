// treeItem/treeItem.js

const api = require('../../../../../../api/ajax.js')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        ReplyList: Array,
    },

    /**
     * 组件的初始数据
     */
    data: {
        ShowInput: false,
        childrenComment: {},
    },

    /**
     * 组件的方法列表
     */
    methods: {

        //下拉刷新
        onPullDownRefresh: function () {
            wx.showNavigationBarLoading()
            console.log(this.data.CommentList)
            setTimeout(() => {
                wx.hideNavigationBarLoading()
                wx.stopPullDownRefresh()
            }, 2000);
        },


        ShowInput: function (e) {
            this.setData({
                ShowInput: true,
                childrenComment: e.currentTarget.dataset.comment
            })
            console.log('e.currentTarget.dataset.comment',e.currentTarget.dataset.comment)
            console.log('this.data.ShowInput',this.data.ShowInput)
        },

        like: function (e) {
            const detail = e.currentTarget.dataset.like
            const ReplyList = this.data.ReplyList
            const Boolean = detail.state === 'true' ? 'false' : 'true'
            const index = e.target.dataset.index
            const state = detail.state === 'true' ? "0" : "1"
            const type = "reply" + ":" + detail.id
            const number = detail.state === 'true' ? --detail.number : ++detail.number
            api._post("/praise", {type, state}).then(() => {
                this.setData({
                    ReplyList: ReplyList.map((item, idx) => idx === index ? {
                        ...item,
                        state: Boolean,
                        number: number
                    } : item)
                })
            })
        },
    },
})
