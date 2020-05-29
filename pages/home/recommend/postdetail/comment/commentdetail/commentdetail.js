import util from "../../../../../../utils/util";

const api = require('../../../../../../api/ajax.js')
Page({
    data: {
        CommentList: {},
        height: '',
        ReplyList: [],
        UserId:util.getUserInfo().user.id
    },

    getCommentList: function () {
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('CommentList', (data) => {
            wx.setNavigationBarTitle({
                title: data.replyList.length + '条回复'
            })
            this.setData({
                CommentList: data,
                ReplyList: data.replyList
            })
        })
    },

    onPullDown: function () {
        wx.showNavigationBarLoading()
        const id = this.data.CommentList.commentId
        api._get("/comment", {id}).then(res => {
            this.setData({
                ReplyList: res.data.replyList
            })
        })
        setTimeout(() => {
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
        }, 2000);
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


    ShowInput: function (e) {
        this.tree = this.selectComponent("#tree")
        this.tree.ShowInput(e)
    },

    onLoad: function () {
        this.getCommentList()
        this.setData({
            height: wx.getSystemInfoSync().windowHeight,
        })
    },
})