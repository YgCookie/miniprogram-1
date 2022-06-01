var wxbarcode=require('../../utils/index.js')
var times=require('../../utils/times.js')
const db= wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    code_openid:'',
    openid:'',
    userinfo:'',
    xzsj:0,
    sqqk:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const app =getApp()
    // var openid =app.globalData.openid
    var openid =wx.getStorageSync('openid')
    var userinfo =wx.getStorageSync('userinfo')
    this.setData({
      openid:openid,
      userinfo:userinfo,
      code_openid:openid.substr(-10).padStart(openid.length, "*")
    })
    wxbarcode.barcode('barcode',openid,680,100)
    wxbarcode.qrcode('qrcode',openid,420,420)
  },
  openqr:function(){
    var openid=this.data.openid
    wx.scanCode({
      onlyFromCamera: true,
      success (res) {
        console.log(res.result)
        // 用户id
        var resultid=res.result
        // qt:0 有预约过的座位再次预约签到的时候会显示签退，因为找到了第零条信息，所以要找签退状态为0的那条数据
        db.collection("xzxx").where({zxzw:res.result,qt:0}).get().then(res=>{
          // console.log(res.data[0].openid)
          // 判断用户标识和用户openid是否一致
          console.log("预约时间段：");
          // console.log(res.data[0].zxsj);
         
          if(res.data.length==0){
            wx.showToast({
              title:"请检查预约信息",
              icon:"error",
              duration:2000,
            })
          }else{
            let xzsj=res.data[0].zxsj
              if(res.data[0].openid==openid){
                 console.log(resultid)
                        if(res.data[0].qdzt==0){
                          db.collection("xzxx").where({zxzw:res.result}).update({
                            data:{
                              qdzt:1,
                              qdsj: Date.parse(new Date()),
                            },
                            success:res=>{
                              wx.showToast({
                                title:"签到成功",
                                icon:"success",
                                duration:2000,
                              })
                            }
                          })
                    }else{
                      var qdsj=res.data[0].qdsj
                      console.log(qdsj);
                      var dateNow=(new Date()).valueOf();
                      var usedTime=dateNow-qdsj
                      console.log(usedTime);
                      var minutes=Math.floor(usedTime/(60*10000));
                      console.log(minutes);
                      // if(minutes>0){
                        db.collection("xzxx").where({zxzw:resultid}).update({
                          data:{
                            qt:1,
                            qtsj:Date.parse(new Date())
                          },
                          success:res=>{
                            console.log(resultid)
                            db.collection("tsgzw").doc(resultid).update({
                              data:{
                                ['sj.'+xzsj+'.0']:0
                              },
                              success:res=>{
                          wx.showToast({
                            title:"签退成功",
                            icon:"success",
                            duration:2000,
                          })
                        }
                            })
                        }
                        })
                      // }else{
                      //   wx.showToast({
                      //     title:"签退间隔过短",
                      //     icon:"error",
                      //     duration:2000,
                      //   })
                      // }
                   
                    }
          }else{
            wx.showToast({
              title:"请检查座位",
              icon:"error",
              duration:2000,
            })
          }
        }
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