const api = require('../../../../../api/ajax.js')
Component({
    data : {
        title : '按热度',
        clicklike : false,
        clickcolor : 'black',
        ShowInput : false,
    },

    properties: {
        commentList: {
            type:Array,
        },
        postId: {
            type:Number,
        }
    },

    methods : {
        like :function(){
            this.setData({
                clickcolor:'red'
            })
        },

        ShowInput : function(){
            this.setData({
                ShowInput : true
            })
        },

        HideInput : function(e){
            this.setData({ShowInput:e.detail})
        },

        GoToCommentDetail : function(e){
          wx.navigateTo({
              url: './comment/commentdetail/commentdetail',
              success: (res) => {
                  // 通过eventChannel向被打开页面传送数据
                  res.eventChannel.emit('CommentList', e.currentTarget.dataset.comment)
              }
          })
        },


        ClickSort : function () {
            const title = this.data.title
            this.setData({
                title : title === '按热度' ? '按时间' : '按热度'
            })
        },

        SendGrandFather : function () {
            this.triggerEvent("UpdateComment")
        }
    },
})