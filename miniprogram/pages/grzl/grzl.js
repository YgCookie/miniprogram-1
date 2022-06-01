// pages/grzl/grzl.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    userInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app =getApp()

    var openid =app.globalData.openid
    this.setData({
      openid:openid
    })
    // 2. 构造查询语句
// collection 方法获取一个集合的引用
// where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
// get 方法会触发网络请求，往数据库取数据
// res
    db.collection("user").where({openid:this.data.openid}).get().then(res=>{
      console.log(res.data)
      this.setData({
        userInfo:res.data
      })
    })
  },
  showgrxg(){
    wx.navigateTo({
      url: '../xgxx/xgxx',
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