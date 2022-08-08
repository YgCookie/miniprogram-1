// pages/zwgll/zwgll.js
const db =wx.cloud.database();
Page({
  _handg10:function(){
    db.collection("tsgzw").where({
      lc0:String("一楼图书室1")
    }).update({
      data: {
        ['sj.' + 0 + '.0']: 0,
        ['sj.' + 1 + '.0']: 0,
        ['sj.' + 2 + '.0']: 0,
        ['sj.' + 3 + '.0']: 0,
        ['sj.' + 4 + '.0']: 0
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  _handg20:function(){
    db.collection("tsgzw").where({
      lc0:String("一楼图书室2")
    }).update({
      data: {
        ['sj.' + 0 + '.0']: 0,
        ['sj.' + 1 + '.0']: 0,
        ['sj.' + 2 + '.0']: 0,
        ['sj.' + 3 + '.0']: 0,
        ['sj.' + 4 + '.0']: 0
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  _handg30:function(){
    db.collection("tsgzw").where({
      lc0:String("二楼图书室1")
    }).update({
      data: {
        ['sj.' + 0 + '.0']: 0,
        ['sj.' + 1 + '.0']: 0,
        ['sj.' + 2 + '.0']: 0,
        ['sj.' + 3 + '.0']: 0,
        ['sj.' + 4 + '.0']: 0
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  _handg00:function(){
    db.collection("tsgzw").where({
      ['sj.' + 0 + '.0']: 2
    }).update({
      data: {
        ['sj.' + 0 + '.0']: 0,
        ['sj.' + 1 + '.0']: 0,
        ['sj.' + 2 + '.0']: 0,
        ['sj.' + 3 + '.0']: 0,
        ['sj.' + 4 + '.0']: 0
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

  _handg11:function(){
    db.collection("tsgzw").where({
      lc0:String("一楼图书室1")
    }).update({
      data: {
        ['sj.' + 0 + '.0']: 2,
        ['sj.' + 1 + '.0']: 2,
        ['sj.' + 2 + '.0']: 2,
        ['sj.' + 3 + '.0']: 2,
        ['sj.' + 4 + '.0']: 2
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  _handg21:function(){
    db.collection("tsgzw").where({
      lc0:String("一楼图书室2")
    }).update({
      data: {
        ['sj.' + 0 + '.0']: 2,
        ['sj.' + 1 + '.0']: 2,
        ['sj.' + 2 + '.0']: 2,
        ['sj.' + 3 + '.0']: 2,
        ['sj.' + 4 + '.0']: 2
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  _handg31:function(){
    db.collection("tsgzw").where({
      lc0:String("二楼图书室1")
    }).update({
      data: {
        ['sj.' + 0 + '.0']: 2,
        ['sj.' + 1 + '.0']: 2,
        ['sj.' + 2 + '.0']: 2,
        ['sj.' + 3 + '.0']: 2,
        ['sj.' + 4 + '.0']: 2
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  _handg01:function(){
    db.collection("tsgzw").where({
      ['sj.' + 0 + '.0']: 0
    }).update({
      data: {
        ['sj.' + 0 + '.0']: 2,
        ['sj.' + 1 + '.0']: 2,
        ['sj.' + 2 + '.0']: 2,
        ['sj.' + 3 + '.0']: 2,
        ['sj.' + 4 + '.0']: 2
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    glItem:[
      {
          id:1,
          lc0:'全部图书馆位置',
          open:'开放图书馆',
          close:'关闭图书馆',
          tap:'_handg00',
          tapc:'_handg01'
      },
      {
        id:2,
        lc0:'一楼图书室1',
        open:'开放该教室',
        close:'关闭该教室',
        tap:'_handg10',
        tapc:'_handg11'
    },
    {
      id:3,
      lc0:'一楼图书室2',
      open:'开放该教室',
      close:'关闭该教室',
      tap:'_handg20',
      tapc:'_handg21'
  },
  {
    id:4,
    lc0:'二楼图书室1',
    open:'开放该教室',
    close:'关闭该教室',
    tap:'_handg30',
    tapc:'_handg31'
}
 ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})