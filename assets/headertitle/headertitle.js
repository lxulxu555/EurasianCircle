const App = getApp()
Component({
    data: {
        navH: '',
    },

    properties: {
        UserInfo: {
            type:Object,
        }
    },

    methods: {
        UpdateHeight: function () {
            //需要添加部分，traCheckedNum是父页面调用需要
            var navH = { navH: App.globalData.navHeight};
            this.triggerEvent("GetHeight", navH )
            this.setData({
                navH: App.globalData.navHeight
            })
        },
        navBack: function () {
            wx.navigateBack({
                delta: 1
            })
        },
        navHome : function () {
            wx.reLaunch({
                url: '/pages/home/home',
            })
        }
    },

    attached: function () {
        this.UpdateHeight()
    }
})
