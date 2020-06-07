// pages/mine/mine.js
const api = require('../../api/ajax.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 1,
        ch: 0,
        isHide: ''
    },

    isGetSetting: function () {
        let that = this
        //获取用户的当前设置
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    // console.log('//session_key 未过期，并且在本生命周期一直有效\n')
                    //that.setData({isHide:false})
                    wx.getUserInfo({
                        success: function (res) {
                            const UserInfo = JSON.parse(res.rawData)
                            that.login(UserInfo)
                        }
                    });
                } else {
                    that.setData({
                        isHide: true
                    });
                }
            }
        });
    },

    onLoad: function (options) {
        this.isGetSetting()
        // 查看是否授权
        wx.getSystemInfo({
            success: res => {
                //转为rpx
                let ch = (750 / res.screenWidth) * res.windowHeight - 80;
                this.setData({
                    ch
                })
            },
        })
    },

    login: function (UserInfo) {
        wx.login({
            success: res => {
                const js_code = res.code
                const nickName = UserInfo.nickName
                const avatarUrl = UserInfo.avatarUrl
                api._post('/user/login', {
                    js_code,
                    nickName,
                    avatarUrl
                }).then(res => {
                    wx.setStorage({
                        key: "User",
                        data: res.data,
                        success: (res) => {
                            this.setData({
                                isHide: false
                            });
                        }
                    })
                })
            }
        });
    },

    bindGetUserInfo: function (e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
            that.isGetSetting()
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {
                    // 用户没有授权成功，不需要改变 isHide 的值
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”');
                    }
                }
            });
        }
    },


    //用户点击tab时调用
    titleClick: function (e) {
        let currentPageIndex =
            this.setData({
                //拿到当前索引并动态改变
                currentIndex: e.currentTarget.dataset.idx
            })
    },

    //用户滑动切换tab调用
    swiperTab: function (e) {
        if (e.detail.source == 'touch') {
            this.setData({
                currentIndex: e.detail.current
            });
        }
    },
})

