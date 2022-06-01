// pages/dk/dk.js
const db=wx.cloud.database()
var times=require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:'',
    xzxx:'',
    qdcs:'',
    len:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo =wx.getStorageSync('userinfo')
    this.setData({
      userinfo:userinfo
    })
    console.log(userinfo[0].openid)
    wx.cloud.callFunction({
      name:'getxz',
      data:{
        openid:userinfo[0].openid
      },
      complete:res=>{
        console.log(res.result.list)
        console.log(res.result.list.length);
        var leng=res.result.list.length;
        for(var i=0;i<res.result.list.length;i++){
          res.result.list[i]["_createTime"]=times.toDate(res.result.list[i]["_createTime"])
          if(res.result.list[i]["qdzt"]!=0){
            res.result.list[i]["qdsj"]=times.toDate(res.result.list[i]["qdsj"])
          }else{
            res.result.list[i]["qdsj"]="暂未签到"
          }

          res.result.list[i]["qtsj"]=times.toDate(res.result.list[i]["qtsj"])
        }
        this.setData({
          xzxx:res.result.list,
          len:leng
        })
        var qdcs=0
      for(let i=0;i<res.result.list.length;i++){
        if(res.result.list[i].qdzt==1){
          qdcs++
        }
      }
      console.log(qdcs)
      this.setData({
        qdcs:qdcs
      })
      }
    })

    // db.collection("xzxx").where({openid:this.data.userinfo[0].openid}).orderBy('_updateTime','desc').get().then(res=>{
    //   console.log(res)
    //   this.setData({
    //     xzxx:res.data
    //   })
    //   
    // })
  },
  qd(){
    wx.navigateTo({
      url: '../sm/sm',
    })
  },
  jl(){
    wx.navigateTo({
      url: '../dkjl/dkjl',
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