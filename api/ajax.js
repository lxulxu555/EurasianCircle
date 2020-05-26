const baseUrl = 'https://eurasia.plus/ring';
import util from '../utils/util'

const http = ({url = '', param = {}, ...other} = {}) => {
    wx.showLoading({
        title: '请求中，请耐心等待..'
    });
    let timeStart = Date.now();
    return new Promise( (resolve, reject) => {
        const token = util.getUserInfo()
        wx.request({
            url: getUrl(url),
            data: param,
            header: {
                "accept": "*/*",
                "content-type": "application/json",
                "token" : 'Bearer ' + token
            },
            ...other,
            complete: (res) => {
                wx.hideLoading();
                console.log(`耗时${Date.now() - timeStart}`);
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }
        })
    })
}

const getUrl = (url) => {
    if (url.indexOf('://') == -1) {
        url = baseUrl + url;
    }
    return url
}

// get方法
const _get = (url, param = {}) => {
    return http({
        url,
        param
    })
}

const _post = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'post'
    })
}

const _put = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'put'
    })
}

const _delete = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'put'
    })
}
module.exports = {
    baseUrl,
    _get,
    _post,
    _put,
    _delete
}