// pages/jbgl/jbgl.js
var times=require('../../utils/times.js')
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rmb:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'jbglcx',
      data:{
        
      },
      complete:res=>{
        console.log(res)
        for(var i=0;i<res.result.list.length;i++){
          res.result.list[i]["_createTime"]=times.toDate(res.result.list[i]["_createTime"])
        }
        this.setData({
          rmb:res.result.list
        })
      }
    })
  },
  jbxq(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../jgglxq/jgglxq?id='+e.currentTarget.id,
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