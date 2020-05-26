const getUserInfo = () => {
    try {
        var value = wx.getStorageSync('User')
        if (value) {
            return value.token
        }
    } catch (e) {
        // Do something when catch error
        return ''
    }
}

module.exports = {
    getUserInfo
}

