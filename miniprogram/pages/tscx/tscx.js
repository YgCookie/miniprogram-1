// pages/tscx/tscx.js
const db= wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rmb:'',
    value:'',
    qxshow:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("tsjs").get().then(res=>{
      console.log(res.data)
      this.setData({
        rmb:res.data
      })
    })
  },
  yhdj(){
    this.setData({
      qxshow:1
    })
  },
  seachtype:function(e){

    console.log(e.detail.value)
    db.collection("tsjs").where({name:db.RegExp({
      regexp:e.detail.value,
      options:'i',
    })
  }).get().then(res=>{
      console.log(res.data)
      this.setData({
        rmb:res.data
      })
    })
  },
  qx(){
    console.log("取消了")
    db.collection("tsjs").get().then(res=>{
      console.log(res.data)
      this.setData({
        rmb:res.data,
        value:'',
        qxshow:0
      })
    })
  },
  tsxq(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../tsxq/tsxq?id='+e.currentTarget.id,
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