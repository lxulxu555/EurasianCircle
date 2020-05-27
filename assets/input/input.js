import util from "../../utils/util";
const api = require('../../api/ajax')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        postId: {
            type:Number,
        },
        type:{
            type:String
        },
        childrenComment:{
            type : Object
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        commentValue : '',
        ShowInput : '',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        GetInputValue : function(e){
            this.setData({
                commentValue:e.detail
            })
        },

        SendHideInput : function(){
            setTimeout(() => {
                this.triggerEvent('SendHideInput')
            },100)
        },

        sendComment : function(){
            let pages = getCurrentPages();  // 获取当前页面栈
            let prevPage = pages[pages.length - 2]; // -2 就是你上一页的数据 你上上页的数据就是-3 了以此类推！
            const nameId = util.getUserInfo().user.id
            const type = this.properties.type === 'reply' ? 'reply' : 'comment'   //判断留言还是回复
            const childrenComment = this.properties.childrenComment
            const content = this.data.commentValue.value
            const postId = type ===  'reply' ? childrenComment.postId : this.data.postId   //帖子id
            if(type === 'reply'){
                const parentName = childrenComment.user.nickName
                const commentId = childrenComment.commentId
                const leaf = childrenComment.leaf === null ? 0 : childrenComment.id
                api._post("/reply",{content,commentId,postId,nameId,leaf,parentName}).then(res => {
                    prevPage.getPostDetail()
                })
            }else{
                api._post("/comment", {postId, content}).then(res => {
                    pages[pages.length - 1].getPostDetail()
                })
            }
        },
    }
})
