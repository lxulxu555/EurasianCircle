import util from "../../../../../utils/util";

const api = require('../../../../../api/ajax.js')
Component({
    data: {
        title: '按热度',
        clicklike: false,
        ShowInput: false,
        UserId: util.getUserInfo().user.id
    },

    properties: {
        commentList: {
            type: Array,
        },
        postId: {
            type: Number,
        }
    },

    methods: {
        like: function (e) {
            const commentList = this.data.commentList
            const index = e.target.dataset.index
            const detail = e.currentTarget.dataset.like
            const Boolean = detail.state === 'true' ? 'false' : 'true'
            const state = detail.state === 'true' ? "0" : "1"
            const type = "comment" + ":" + detail.commentId
            const number = detail.state === 'true' ? --detail.number : ++detail.number
            api._post("/praise", {type, state}).then(() => {
                this.setData({
                    commentList: commentList.map((item, idx) => idx === index ? {...item, state: Boolean,number:number} : item)
                })
            })
        },

        ShowInput: function () {
            this.setData({
                ShowInput: true
            })
        },

        HideInput: function () {
            this.setData({ShowInput: false})
        },

        GoToCommentDetail: function (e) {
            wx.navigateTo({
                url: './comment/commentdetail/commentdetail',
                success: (res) => {
                    // 通过eventChannel向被打开页面传送数据
                    res.eventChannel.emit('CommentList', e.currentTarget.dataset.comment)
                }
            })
        },


        ClickSort: function () {
            const title = this.data.title
            this.setData({
                title: title === '按热度' ? '按时间' : '按热度'
            })
        },
    },
})