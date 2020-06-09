const api = require("../../api/ajax.js")
Component({
    data: {
        dialogShow: false,
        buttons: [{text: '取消'}, {text: '确定'}],
    },

    properties: {
        comment: Object,
        type: String
    },

    methods: {
        ShowConfirm: function () {
            this.setData({dialogShow: true})
        },

        tapDialogButton(e) {
            const index = e.detail.index
            const type = this.data.type
            console.log(type)
            const id = type === "CommentHome" ? this.data.comment.commentId : this.data.comment.id
            let pages = getCurrentPages();  // 获取当前页面栈
            let prevPage = type === "CommentHome" ? pages[pages.length - 1] : pages[pages.length - 2]
            if (index === 1) {
                if (type !== "CommentHome") {
                    api._delete("/reply?" + "id=" + id).then(res => {
                        this.triggerEvent("UpdateGrandrNewComment")
                    })
                } else {
                    api._delete("/comment?" + "id=" + id)
                }
                prevPage.UpdateCommentDetail()
            }
            this.setData({
                dialogShow: false,
            })
        },

    }
})