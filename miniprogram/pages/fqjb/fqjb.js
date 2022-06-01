// pages/fqjb/fqjb.js
const db = wx.cloud.database()
Page({

  data: {
    showTopTips: false,
    radioItems: [
      { name: '座位被他人占用', value: '0', checked: true },
      { name: '座位预约无人使用', value: '1' }
    ],
    items: [], 
    files: [],
    jbzw: 0,
    // sjxx: [["时间段1:8:00-9:30", 0], ["时间段2:9:30-11:00", 1], ["时间段3:11:00-12:30", 2], ["时间段4:12:30-2:00", 3], ["时间段5:2:00-4:00", 4]],
    sjxx: [["时间段1:7:30-9:30", 0], ["时间段2:9:30-11:30", 1], ["时间段3:11:30-14:30", 2], ["时间段4:14:30-19:00", 3], ["时间段5:19:00-22:00", 4]],
    sjxxIndex: 0,
    formData: {
    },
    jbyy: '',
    rules: [{
      name: 'radio',
      rules: { required: false, message: '单选列表是必选项' },
    }],
    openid:''
  },
  onLoad: function (options) {
    const app=getApp()
    var openid=app.globalData.openid
    this.setData({
      openid:openid
    })
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
    wx.cloud.callFunction({
      name: "getzwlist",
      complete: res => {
        console.log(res.result.list)
        var lscc = [];
        for (let i = 0; i < res.result.list.length; i++) {
          var lssz = {};
          lssz.name = res.result.list[i].bh;
          lssz.value = res.result.list[i]._id;
          lscc.push(lssz);
        }
        this.setData({
          items: lscc
        })
      }
    })
  },
  formip(e) {
    console.log(e.detail.value)
    this.setData({
      jbyy: e.detail.value
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems,
      [`formData.radio`]: e.detail.value
    });
  },
  bindxzzw: function (e) {
    this.setData({
      jbzw: e.detail.value
    })
  },
  bindsjxx: function (e) {
    this.setData({
      sjxxIndex: e.detail.value
    })
  },
  submitForm() {
    if (this.data.jbyy != '') {
      db.collection('jdjb').add({
        data: {
          openid: this.data.openid,
          yy: this.data.jbyy,
          jbzw: this.data.items[this.data.jbzw].value,
          zp:this.data.files,
          jblx:this.data.formData.radio,
          sjd: this.data.sjxxIndex,
          cljg:'',
          _createTime: Date.parse(new Date()),
        }
      }).then(res => {
        wx.showToast({
          title: '举报成功',
          icon: 'success',
          duration: 2000,
          success:res=>{
            setTimeout(function(){
              wx.switchTab({
                url: '../index/index',
              })
            },2000)
          }
        })
      })
    }
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    console.log('upload files', files)
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      const tempFilePaths = files.tempFilePaths;
      //上传返回值
      const that = this;
      const object = {};
      for (var i = 0; i < tempFilePaths.length; i++) {
        let filePath = '', cloudPath = ''
        filePath = tempFilePaths[i]
        // 上传图片
        // cloudPath 最好按时间 遍历的index来排序，避免文件名重复
        cloudPath = 'blog-title-image-' + new Date().getTime() + '-' + i + filePath.match(/\.[^.]+?$/)[0]

        console.log(filePath)
        console.log(cloudPath)
        const upload_task = wx.cloud.uploadFile({
          filePath,
          cloudPath,
          success: function (res) {
            console.log(res)
            // 可能会有好几个200+的返回码，表示成功
            if (res.statusCode === 200 || res.statusCode === 204 || res.statusCode === 205) {
              const url = res.fileID
              that.data.files.push(url)
              if (that.data.files.length === tempFilePaths.length) {
                object.urls = that.data.files;
                resolve(object)  //这就是判断是不是最后一张已经上传了，用来返回，
              }
            } else {
              reject('error')
            }
          },
          fail: function (err) {
            console.log(err)
          },
          conplete: () => {

          }
        })
      }
    })
    // 文件上传的函数，返回一个promise
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  }
})