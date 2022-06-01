// pages/qxyy/qxyy.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [{
        name: '有课',
        value: 'yk',
        checked: true
      },
      {
        name: '生病',
        value: 'sb'
      },
      {
        name: '其他',
        value: 'qt'
      }
    ],
    xzyy:'',
    list_id:''
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
      list_id:options.id
    })
  },
  radioChange(e){
    console.log("取消");
    console.log(e.detail.value)
    this.setData({
      xzyy:e.detail.value
    })
  },
  submitForm(){
    db.collection('qxdd').add({
      data:{
        yyxx:this.data.list_id,
        qxyy:this.data.xzyy,
        openid:this.data.openid,
        _createTime: Date.parse(new Date()),
      },
      success: (res)=> {
        db.collection('xzxx').doc(this.data.list_id).update({
          data:{
            qx:1,
            _updateTime: Date.parse(new Date()),
          },
          success:(res=>{
            db.collection('xzxx').doc(this.data.list_id).get().then(res=>{
              // console.log("失败");
              console.log("取消的时间段："+res.data.zxsj)
              var zwid=res.data.zxzw
              var xzsj=res.data.zxsj
              db.collection('tsgzw').doc(zwid).update({
                data:{
                  // zwzt:0,
                  ['sj.'+xzsj+'.0']:0,
                  _updateTime: Date.parse(new Date()),
                },
                success:(res=>{
                  wx.showToast({
                    title: '取消成功',
                    icon:'success',
                    duration:2000,
                    success:(res)=>{
                      setTimeout(function(){
                        wx.switchTab({
                          url: '../index/index',
                        })
                      },2000)
                    }
                  })
                })
              })
            })
          })
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