// pages/jdjb/jdjb.js
var times=require('../../utils/times.js')
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    rmb:''
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
    wx.cloud.callFunction({
       name:'getjdjb',
      data:{
        openid:openid
      },
      complete:res=>{
        // console.log(res.result.list)
        for(var i=0;i<res.result.list.length;i++){
          res.result.list[i]["_createTime"]=times.toDate(res.result.list[i]["_createTime"])
        }
        this.setData({
          rmb:res.result.list
        })
      }
    })
  },
  jdjb(){
    wx.navigateTo({
      url: '../fqjb/fqjb',
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