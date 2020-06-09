const api = require("../../../api/ajax")
const utils = require("../../../utils/util")
Component({
    data: {
        files: [],
        content: '',
        title: '',
        array: [],
        classifyId: '',
        matterId: '',
        type: ''
    },

    methods: {

        ChangeArea: function (e) {
            this.setData({
                content: e.detail.value
            })
        },

        ChangeTitle: function (e) {
            this.setData({
                title: e.detail.value
            })
        },

        bindPickerChange: function (e) {
            const id = parseInt(e.detail.value) + 1
            this.setData({
                classifyId: id
            })
        },

        selectFile(files) {
            // 返回false可以阻止某次文件上传
            const urls = files.tempFilePaths
            const length = urls.length
            for (let i = 0; i < length; i++) {
                wx.uploadFile({
                    url: 'https://eurasia.plus/ring/upload/image',
                    filePath: urls[i],
                    name: 'file',
                    header: {
                        "content-type": "application/json",
                        "accept": "*/*",
                        "token": 'Bearer ' + utils.getUserInfo().token
                    },
                    success: (res) => {
                        const jsonData = JSON.parse(res.data)
                        const data = jsonData.data.thumbnailUrl
                        this.setData({
                            files: [...this.data.files, {url: data}]
                        })
                    },
                    fail(res) {
                        console.log(res)
                    },
                })
            }
        },

        uplaodFile(files) {
            const urls = files.tempFilePaths
            // 文件上传的函数，返回一个promise
            return new Promise((resolve, reject) => {
                resolve({urls})
            })
        },

        getPicker: function () {
            api._get("/classify").then(res => {
                this.setData({
                    array: res.data
                })
            })
        },

        getHotMatterInit: function () {
            const eventChannel = this.getOpenerEventChannel()
            eventChannel.on('GetId', (data) => {
                const {matterId, type} = data
                this.setData({
                    matterId,
                    type
                })
            })
        },

        SendPost: function () {
            const {title, content, files, classifyId, matterId, type} = this.data
            const images = []
            files.map(function (item) {
                images.push(item.url)
            })
            const imagesUrl = images.toString()
            if (content === '' || title === '') {
                wx.showToast({
                    title: '标题或内容不能为空',
                    icon: 'none',
                    duration: 2000
                })
            }
            else if (classifyId === '' && matterId === ''){
              wx.showToast({
                title: '请选择分类',
                icon: 'none',
                duration: 2000
              })
            }
            else {
                api._post("/post", type !== 'Hotmatter' ? {title, content, imagesUrl, classifyId} :
                    {title, content, imagesUrl, matterId})
                    .then(res => {
                        wx.reLaunch({
                            url: '../../home/home'
                        })
                    })
            }
        },


        uploadError(e) {
            console.log('upload error', e.detail)
        },

        uploadSuccess(e) {
        },
    },


    ready() {
        this.setData({
            selectFile: this.selectFile.bind(this),
            uplaodFile: this.uplaodFile.bind(this)
        })
        wx.setNavigationBarTitle({
            title: '发布'
        })
        this.getPicker()
        this.getHotMatterInit()
    },
});
