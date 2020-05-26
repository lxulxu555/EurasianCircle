const api = require('../../api/ajax')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        postId: {
            type:Number,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        commentValue : '',
        ShowInput : ''
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

        sendComment : function(){
            const content = this.data.commentValue.value
            const postId = this.data.postId
            api._post("/comment",{postId,content}).then(res => {
                this.triggerEvent("SendFather")
            })
        },

        HideInput :function(e){
            setTimeout(() => {
                this.triggerEvent("SendShowInput",false)
            },100)
        },


    }
})
