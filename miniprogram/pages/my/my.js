// pages/my/my.js
const app = getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    userInfo: ''
  },
  // 获取openid
  getopenid() {
    // 将this的值赋给that在js中很常用,因为this指向的对象随时会变
    var that = this;
    // 调用云函数
    wx.cloud.callFunction({
      name: 'open',
      success: (res) => {
        var usid = res.result.openid
        console.log(usid)
        this.setData({
          openid: res.result.openid,
        })
        getApp().globalData.openid = res.result.openid
        db.collection("user").where({ openid: res.result.openid }).get().then(res => {
          console.log(res.data)
          this.setData({
            userInfo: res.data
          })
          if (res.data == '') {
            wx.navigateTo({
              url: '../getuser/getuser',
            })
          }
          // 把数据缓存在本地key值为userinfo
          wx.setStorageSync('userinfo', res.data)
        })
        
        wx.setStorageSync('openid', res.result.openid)
      },
      fail(res) {
        console.log("获取失败", res);
      }
    })/*
    wx.getUserProfile({
      desc:'用于完善资料',//声明
      success:(res)=>{
        this.setData({
          userInfo:res.userInfo
        })
      },
      fail(res){
        console.log('用户拒绝')
      }
    })*/
  },
  wdyy(){
    wx.navigateTo({
      url: '../wdyy/wdyy',
    })
  },
  grzl() {
    if (this.data.openid != '') {
      wx.navigateTo({
        url: '../grzl/grzl',
      })
    } else {
      wx.showToast({
        title: '请登录',
        icon: 'error',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getStorageSync：从本地缓存中同步获取指定 key 的内容。
    let user=wx.getStorageSync('openid')
    var userinfo =wx.getStorageSync('userinfo')
    this.setData({
      openid:user,
      userInfo:userinfo
    })
    getApp().globalData.openid = user
    if(this.data.userInfo==''){
      db.collection("user").where({ openid: user }).get().then(res => {
        console.log(res.data)
        this.setData({
          userInfo: res.data
        })
        wx.setStorageSync('userinfo', res.data)
      })
    }

  },
  showgyqfk(){
    wx.navigateTo({
      url: '../yjfk/yjfk',
    })
  },
  fwzx(){
    wx.navigateTo({
      url: '../fwzx/fwzx',
    })
  },
  showgywm(){
    wx.navigateTo({
      url: '../gywm/gywm',
    })
  },
  showgl(){
    if(this.data.userInfo[0].isadmin==1){
      wx.navigateTo({
        url: '../glht/glht',
      })
    }else{
      wx.showToast({
        title: '无权限',
        icon: 'error',
        duration: 2000
      })
    }
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