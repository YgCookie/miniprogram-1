// pages/wpxx/wpxx.js
const db = wx.cloud.database()
var times=require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rmb:'',
    listid:'',
    openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app=getApp()
    var openid=app.globalData.openid
    this.setData({
      openid:openid
    })
    console.log(options.id)
    this.setData({
      listid:options.id
    })
    db.collection("swzl").doc(options.id).get().then(res => {
      console.log(res.data)
        res.data["_createTime"]=times.toDate(res.data["_createTime"])
      this.setData({
        rmb: res.data
      })
    })
  },
  wj(){
    db.collection("swzl").doc(this.data.listid).update({
      data:{
        wzzt:1
      },
      success:res=>{
        wx.showToast({
          title: '完结成功',
          icon: 'success',
          duration: 2000,
          success:res=>{
            wx.switchTab({
              url: '../index/index',
            })
          }
        })
      }
    })
  },
  qc(){
    db.collection("swzl").doc(this.data.listid).remove({
      success:function(res){
        wx.switchTab({
          url: '../index/index',
        })
      }
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