import util from "../../utils/util";

const api = require('../../api/ajax')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        postId: {
            type: Number,
        },
        type: {
            type: String
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        commentValue: '',
        ShowInput: '',
        comment: {}
    },

    /**
     * 组件的方法列表
     */
    methods: {
        GetInputValue: function (e) {
            this.setData({
                commentValue: e.detail.value
            })
        },

        SendHideInput: function () {
            setTimeout(() => {
                this.triggerEvent('SendHideInput')
            }, 100)
        },

        SaveComment: function (comment) {
            this.setData({comment})
        },

        sendComment: function () {
            let pages = getCurrentPages();  // 获取当前页面栈
            let prevPage = pages[pages.length - 2]; // -2 就是你上一页的数据 你上上页的数据就是-3 了以此类推！
            const type = this.properties.type === 'reply' ? 'reply' : 'comment'   //判断留言还是回复
            const comment = this.data.comment
            const content = this.data.commentValue
            const postId = type === 'reply' ? comment.postId : this.data.postId   //帖子id
            if (type === 'reply') {
                const nameId = comment.user.id
                const parentName = comment.user.nickName
                const commentId = comment.commentId
                const leaf = comment.leaf === null ? 0 : comment.id
                api._post("/reply", {content, commentId, postId, nameId, leaf, parentName}).then(res => {
                    prevPage.UpdateCommentDetail()
                    this.triggerEvent("UpdateFatherNewComment")
                })
            } else {
                api._post("/comment", {postId, content}).then(res => {
                    pages[pages.length - 1].UpdateCommentDetail()
                })
            }
            this.setData({commentValue: ''})
        },
    }
})
