// pages/getuser/getuser.js
const db = wx.cloud.database()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    name: '',
    userid: '',
    userphoto: '',
    imgrl: ''
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      avatarUrl,
    })
  },
  formInputChange(e) {
    console.log(e)
    this.setData({
      name: e.detail.value
    })
  },
  formSubmit(e) {
    console.log(e.detail.value.input)
    this.setData({
      name: e.detail.value.input
    })
    var that = this;
        const filePath = this.data.avatarUrl
        wx.cloud.uploadFile({
          cloudPath: (new Date()).valueOf() + '.png', // 文件名
          filePath: filePath, // 文件路径
          success: res => {
            // get resource ID
            console.log(res.fileID)
            // 赋值图片
            that.setData({
              imgrl: res.fileID
            })
            that.upload(res.fileID);
          },
          fail: err => {
            // handle error
          }
        })
  },
  upload(filepath){
    console.log(filepath)
    db.collection("user").add({
      data: {
          name:this.data.name,
          openid:this.data.userid,
          userphoto:filepath,
          _createTime: Date.parse(new Date()),
      }
  }).then(res => {
      wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
      })
      wx.redirectTo({
        url: '../my/my',
      })
  })
  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp()
    var userid = app.globalData.openid
    this.setData({
      userid: userid,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})