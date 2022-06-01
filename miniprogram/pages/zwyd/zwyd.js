// // pages/zwyd/zwyd.js
// const db =wx.cloud.database()
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//       list_id:'',
//       rmbs:''
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad(options) {
//     this.setData({
//       list_id:options.list_id
//     })
//     // doc有查询的作用
//     db.collection("tsgzw").doc(this.data.list_id).get().then(res=>{
//       console.log(res);
//       this.setData({
//         rmbs:res.data
//       })
//     })

//     wx.cloud.callFunction({
//       name:'getzwlist',
//       data:{
//         listid:options.list_id// 此处填入了某种方式获取得到的 Buffer 数据，可以是 request 下来的，可以是读文件读出来的等等

//       },
//       // 无论对错均输出
//       complete:res=>{
//          console.log(res.result);
//          this.setData({
//           //  rmbs:res.result
//          })
//       }
//     })



//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady() {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow() {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide() {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload() {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh() {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom() {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage() {

//   }
// })





/***************************************************************** */
// pages/zwyd/zwyd.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_id:'',
    rmbs:'',
    userinfo:'',
    openid:'',
    // sjxx:[["8:00-9:30",0],["9:30-11:00",1],["11:00-12:30",2],["12:30-2:00",3],["2:00-4:00",4]],
    sjxx: [["时间段1:7:30-9:30", 0], ["时间段2:9:30-11:30", 1], ["时间段3:11:30-14:30", 2], ["时间段4:14:30-19:00", 3], ["时间段5:19:00-22:00", 4]],
    sjxxindex:0,//时间默认值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo =wx.getStorageSync('userinfo')
    // const app = getApp()
    // var openid = app.globalData.openid
    var openid = wx.getStorageSync('openid')
    console.log(options)
    this.setData({
      list_id:options.list_id,
      userinfo:userinfo,
      openid:openid,
      sjxxindex:options.sjid
    })
    wx.cloud.callFunction({
      //云函数的引入区分单引号和双引号
      name:"getzwlist",
      data:{
        listid:options.list_id
      },
      complete:res=>{
        console.log(res.result.list)
        this.setData({
          rmbs:res.result.list
        })
      }
    })
  },
  qrxz(){
    db.collection("xzxx").add({
      data:{
        openid:this.data.openid,
        zxzw:this.data.list_id,
        // zxzw:options.list_id,
        qdzt:0,
        qt:0,
        zxsj:this.data.sjxxindex,
        _createTime: Date.parse(new Date()),
      }
    }).then(res=>{
      wx.showToast({
        title:'选座成功',
        icon:'success',
        duration:2000,
        success:()=>{
          console.log(this.data.list_id)
          db.collection("tsgzw").doc(this.data.list_id).update({
            data:{
              // zwzt:2
              ['sj.'+this.data.sjxxindex+'.0']:2
            },
            success:res=>{
              setTimeout(function(){
                wx.switchTab({
                  url: '../index/index',
                })
              },2000)
            }
          })
        }
      })
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