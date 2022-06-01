// pages/jgglxq/jgglxq.js
var times=require('../../utils/times.js')
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rmb:'',
    // sjxx: [["时间段1:8:00-9:30"], ["时间段2:9:30-11:00"], ["时间段3:11:00-12:30"], ["时间段4:12:30-2:00"], ["时间段5:2:00-4:00"]],
    sjxx: [["时间段1:7:30-9:30", 0], ["时间段2:9:30-11:30", 1], ["时间段3:11:30-14:30", 2], ["时间段4:14:30-19:00", 3], ["时间段5:19:00-22:00", 4]],
    fyyj:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var id=options.id
    this.setData({
      id:options.id
    })
    wx.cloud.callFunction({
      name:'getjbglxq',
      data:{
        id:id
      },
      complete:res=>{
        console.log(res)
        for(var i=0;i<res.result.list.length;i++){
          res.result.list[i]["_createTime"]=times.toDate(res.result.list[i]["_createTime"])
          if(res.result.list[i]["jblx"]==1){
            res.result.list[i]["jblx"]="座位预约无人使用"
          }else{
            res.result.list[i]["jblx"]="座位被他人占用"
          }
          res.result.list[i]["sjdz"]=this.data.sjxx[res.result.list[i]["sjd"]]
        }
        this.setData({
          rmb:res.result.list
        })
      }
    })
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
    this.setData({
      fkyy:e.detail.value
    })
  },
  showgrxg(){
    db.collection('jdjb').doc(this.data.id).update({
      data:{
        cljg:this.data.fkyy
      },
      success: res => {
        wx.showToast({
          title: '处理成功',
          icon: 'success',
          duration: 2000
        })
      },
    })
  },
  showgrxg1(){
    db.collection('jdjb').doc(this.data.id).update({
      data:{
        cljg:this.data.fkyy
      },
      success: res => {
        if(this.data.rmb[0].jblx=="座位预约无人使用"){
           db.collection('tsgzw').doc(this.data.rmb[0].jbzw).update({
          data:{
            ['sj.'+this.data.rmb[0].sjd+'.0']:0
          }
        })
        }
        wx.showToast({
          title: '处理成功',
          icon: 'success',
          duration: 2000
        })
      },
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