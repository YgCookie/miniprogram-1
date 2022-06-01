// pages/zwyy/zwyy.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    sjxx: [["时间段1:7:30-9:30", 0], ["时间段2:9:30-11:30", 1], ["时间段3:11:30-14:30", 2], ["时间段4:14:30-19:00", 3], ["时间段5:19:00-22:00", 4]],
    sjxxindex: 0,
    placearr: ['查看全部', '东区图书馆一楼', '东区图书馆二楼'],
    ztarr: [['查看全部', 0], ['已预约', 1], ['可预约', 2], ['不可预约', 3]],
    rmb: '',
    tswz: '',
    wzxz: '',
    yyzt: 0,
    sjzt: '',
    lcid: ''
  },
  bindPickerChangeplace: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value,
      wzxz: this.data.placearr[e.detail.value]
    })
    var lstszw=this.data.tswz
    if(e.detail.value==0){
      for(let k=0;k<lstszw.length;k++){
        lstszw[k].xs=1
      }
      this.setData({
        tswz:lstszw
      })
    }else{
      let xssx=e.detail.value-1
      for(let k=0;k<lstszw.length;k++){
        lstszw[k].xs=0
      }
      lstszw[xssx].xs=1;
      this.setData({
        tswz:lstszw
      })
    }
    // this.zslb()
  },
  bindPickerChangesjxx: function (e) {
    console.log(e.detail.value)
    this.setData({
      sjxxindex: e.detail.value,
    })
    this.zslb()
  },
  bindPickerChangezt: function (e) {
    console.log(e.detail.value)
    this.setData({
      yyzt: e.detail.value,
    })
    this.zslb()
  },
  zslb() {
       if(this.data.sjxxindex!='' && this.data.yyzt!=0){
        wx.cloud.callFunction({
              name: "getzw",
              complete: res => {
                for (let i = 0; i < res.result.data.length; i++) {
                  res.result.data[i].zwzt = res.result.data[i].sj[this.data.sjxxindex][0]
                  var ztsjk = 0;
                  if (this.data.yyzt == 1) {
                    ztsjk = 2
                  } else if (this.data.yyzt == 2) {
                    ztsjk = 0
                  } else {
                    ztsjk = 1
                  }
                  if (res.result.data[i].zwzt != ztsjk) {
                    res.result.data[i].zt = 1
                  }
                  this.setData({
                    rmb: res.result.data
                  })
                }
              }
            })
       }else{
         if(this.data.sjxxindex!=''&&this.data.yyzt==0){
          wx.cloud.callFunction({
                name: "getzw",
                complete: res => {
                  for (let i = 0; i < res.result.data.length; i++) {
                    res.result.data[i].zwzt = res.result.data[i].sj[this.data.sjxxindex][0]
                    this.setData({
                      rmb: res.result.data
                    })
                  }
                }
              })
         }else{
          wx.cloud.callFunction({
              name: "getzw",
              complete: res => {
                for (let i = 0; i < res.result.data.length; i++) {
                  res.result.data[i].zwzt = res.result.data[i].sj[this.data.sjxxindex][0]
                  var ztsjk = 0;
                  if (this.data.yyzt == 1) {
                    ztsjk = 2
                  } else if (this.data.yyzt == 2) {
                    ztsjk = 0
                  } else {
                    ztsjk = 1
                  }
                  if (res.result.data[i].zwzt != ztsjk) {
                    res.result.data[i].zt = 1
                  }
                  this.setData({
                    rmb: res.result.data
                  })
                }
              }
            })
       }
      }
    },


    // if (this.data.sjxxindex != '' && this.data.wzxz == 0 && this.data.yyzt == 0) {
    //   console.log("5")
    //   wx.cloud.callFunction({
    //     name: "getzw",
    //     complete: res => {
    //       for (let i = 0; i < res.result.data.length; i++) {
    //         res.result.data[i].zwzt = res.result.data[i].sj[this.data.sjxxindex][0]
    //         this.setData({
    //           rmb: res.result.data
    //         })
    //       }
    //     }
    //   })
    // } else if (this.data.sjxxindex != '' && this.data.wzxz == 0 && this.data.yyzt != 0) {
    //   console.log("55")
    //   wx.cloud.callFunction({
    //     name: "getzw",
    //     complete: res => {
    //       for (let i = 0; i < res.result.data.length; i++) {
    //         res.result.data[i].zwzt = res.result.data[i].sj[this.data.sjxxindex][0]
    //         var ztsjk = 0;
    //         if (this.data.yyzt == 1) {
    //           ztsjk = 2
    //         } else if (this.data.yyzt == 2) {
    //           ztsjk = 0
    //         } else {
    //           ztsjk = 1
    //         }
    //         if (res.result.data[i].zwzt != ztsjk) {
    //           res.result.data[i].zt = 1
    //         }
    //         this.setData({
    //           rmb: res.result.data
    //         })
    //       }
    //     }
    //   })
    // } else if (this.data.sjxxindex != '' && this.data.wzxz != 0 && this.data.yyzt == 0) {
    //   console.log("555")
    //   for (let i = 0; i < this.data.tswz.length; i++) {
    //     if (this.data.tswz[i].tsglc == this.data.wzxz) {
    //       var lcid = this.data.tswz[i]._id
    //       this.setData({
    //         lcid: this.data.tswz[i]._id
    //       })
    //     }
    //     wx.cloud.callFunction({
    //       name: "getzw",
    //       complete: res => {
    //         for (let i = 0; i < res.result.data.length; i++) {
    //           res.result.data[i].zwzt = res.result.data[i].sj[this.data.sjxxindex][0]
    //           if (this.data.lcid != res.result.data[i].lc) {
    //             res.result.data[i].zt = 1
    //           }
    //           this.setData({
    //             rmb: res.result.data
    //           })
    //         }
    //       }
    //     })
    //   }
    // } else {
    //   if (this.data.wzxz != "查看全部") {
    //     for (let i = 0; i < this.data.tswz.length; i++) {
    //       console.log(this.data.tswz[i].tsglc)
    //       if (this.data.tswz[i].tsglc == this.data.wzxz) {
    //         console.log(this.data.tswz[i]._id)
    //         var lcid = this.data.tswz[i]._id
    //         this.setData({
    //           lcid: this.data.tswz[i]._id
    //         })
    //       }
    //       wx.cloud.callFunction({
    //         name: "getzw",
    //         complete: res => {
    //           for (let i = 0; i < res.result.data.length; i++) {
    //             res.result.data[i].zwzt = res.result.data[i].sj[this.data.sjxxindex][0]
    //             if (this.data.lcid != res.result.data[i].lc) {
    //               res.result.data[i].zt = 1
    //             }
    //             this.setData({
    //               rmb: res.result.data
    //             })
    //           }
    //         }
    //       })
    //     }
    //   }else{
    //     wx.cloud.callFunction({
    //       name: "getzw",
    //       complete: res => {
    //         for (let i = 0; i < res.result.data.length; i++) {
    //           res.result.data[i].zwzt = res.result.data[i].sj[this.data.sjxxindex][0]
    //           this.setData({
    //             rmb: res.result.data
    //           })
    //         }
    //       }
    //     })
    //   }
    // }
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "getzw",
      complete: res => {
        for (let i = 0; i < res.result.data.length; i++) {
          res.result.data[i].zwzt = res.result.data[i].sj[this.data.sjxxindex][0]
          this.setData({
            rmb: res.result.data
          })
        }
      }
    })
    db.collection("tsgwz").get().then(res => {
      console.log(res)
      for(let k=0;k<res.data.length;k++){
        res.data[k].xs=1;
      }
      this.setData({
        tswz: res.data
      })
      var arr = ['查看全部']
      for (var i = 0; i < res.data.length; i++) {
        arr.push(res.data[i].tsglc);
      }
      console.log(arr)
      this.setData({
        placearr: arr
      })
    })
  },
  getList() {
    wx.cloud.callFunction({
      name: "getzw",
      complete: res => {
        for (let i = 0; i < res.result.data.length; i++) {
          res.result.data[i].zwzt = res.result.data[i].sj[this.data.sjxxindex][0]
          this.setData({
            rmb: res.result.data
          })
        }
      }
    })
  },
  showxq(e) {
    console.log(e.currentTarget.id)
    db.collection("tsgzw").doc(e.currentTarget.id).get().then(res => {
      res.data.zwzt = res.data.sj[this.data.sjxxindex][0]
      var dbxs = ''
      var dbfz = ''
      if (this.data.sjxxindex == 0) {
        dbxs = 7; dbfz = 30;
      } else if (this.data.sjxxindex == 1) {
        dbxs = 11; dbfz = 30;
      } else if (this.data.sjxxindex == 2) {
        dbxs = 16; dbfz = 30;
      } else if (this.data.sjxxindex == 3) {
        dbxs = 19; dbfz = 0;
      } else {
        dbxs = 23; dbfz =59 
      }
      console.log(res.data.zwzt)
      var myDate = new Date();
      var xs = myDate.getHours();//获取小时
      var fz = myDate.getMinutes();

      if (res.data.zwzt == 0) {
        if (xs < dbxs) {
          this.getList();
          wx.navigateTo({
            url: '../zwyd/zwyd?list_id=' + e.currentTarget.id + "&sjid=" + this.data.sjxxindex,
          })
        } else if (xs == dbxs) {
          if (fz < dbfz) {
            this.getList();
            wx.navigateTo({
              url: '../zwyd/zwyd?list_id=' + e.currentTarget.id + "&sjid=" + this.data.sjxxindex,
            })
          } else {
            wx.showToast({
              title: '不可预约',
              icon: 'error',
              duration: 2000
            })
          }
        } else {
          wx.showToast({
            title: '该时间段已过',
            icon: 'error',
            duration: 2000
          })
        }
      }
      else {
        wx.showToast({
          title: '不可预约',
          icon: 'error',
          duration: 2000
        })
        this.getList();
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
    console.log("显示了")
    this.getList();
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
    this.getList()
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