// pages/wdyy/wdyy.js
const db=wx.cloud.database()
var times=require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    xzxx:'',
    qxxx:''
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
      name:'getxz',
      data:{
        openid:openid
      },
      complete:res=>{
        console.log(res.result.list)
        for(var i=0;i<res.result.list.length;i++){
          res.result.list[i]["_createTime"]=times.toDate(res.result.list[i]["_createTime"])
          if( res.result.list[i].qdzt!=0){
            res.result.list[i]["qdsj"]=times.toDate(res.result.list[i]["qdsj"])  
          }
          if( res.result.list[i].qt!=0){
            res.result.list[i]["qtsj"]=times.toDate(res.result.list[i]["qtsj"])
          }
         
        }
        this.setData({
          xzxx:res.result.list
        })
      }
    })
  },
  qxzw(e){
    console.log(e.currentTarget.id)
    db.collection('xzxx').doc(e.currentTarget.id).get().then(res=>{
      console.log(res.data)
      if(res.data.qx!=1&&res.data.qdzt==0){
        wx.navigateTo({
          url: '../qxyy/qxyy?id='+e.currentTarget.id,
        })
      }else{
        wx.showToast({
          title: '不可取消',
          icon: 'error',
          duration: 2000
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