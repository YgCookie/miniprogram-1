// pages/index/index.js
const db = wx.cloud.database()

Page({
  // 判断是否可以登陆
  // _handsubmit1:function (evt) {
  //   console.log(evt);
  // },
  // 记住密码、保持登陆的逻辑
  _handRemenberLogin:function(evt){
    //  console.log(evt.detail.value.length);
     let lentl=evt.detail.value.length;
     if(lentl===1){
       this.setData({
        _checked:true
       })
     }
  },
  _handRemenberPwd:function (evt) {
    // console.log(evt);
    let lent=evt.detail.value.length;
    // console.log(lent);
    if(lent===0){
      this.setData({
        _login:false
      })
    }
  },
  // 账号和密码的获取
    _handsubmit:function(res){
      console.log(res);
      var name1=res.detail.value.name
      var pwd1=res.detail.value.pwd
      // console.log(evt.detail.value.name);
      // console.log(evt.detail.value.pwd);
      db.collection("adminK").where({
        // 注意字符类型
        adminNumber: String(name1),
        mima: Number(pwd1)
    }).get().then(res => {
        console.log(res);
        if(res.data.length==0){
          wx.showModal({
            title: "警告",
            content: '密码或账号错误',
          })
        }else{
          wx.reLaunch({
          url: "/pages/zwgl/zwgl",
          })
        }
    })   
  
    },

    _handInputName:function(evt){
      // console.log(evt);
      let name=evt.detail.value;
      console.log(name);
      this.setData({
        isGood:name.length>=3&&name.length<=6,
        name:name
      })
      if (name.length>=3&&name.length<=6)
      {
        this.setData({
          isGood:true
        })
      }else{
        this.setData({
          isGood:false
        })
      }
    },
    _handInputPwd:function(res) {
      let pwd=res.detail.value;
      // console.log(res);
      console.log(pwd);
      this.setData({
        loginV:pwd.length>=3&&pwd.length<=8,
        pwd:pwd
      })
    },
    _handno:function(res){
      wx.showModal({
        title: "不可进行的操作",
        content: '请申请管理员账号直接登陆',
      })
    },
 

    // _handyes:function(res){
    //   console.log(res);
    //   db.collection("adminK").where({
    //     adminNumber:res.name,
    //     mima:res.pwd
  //   }).get().then(res => {
  //       console.log(res);
  //       if(res.data.length==0){
  //         wx.showModal({
  //           title: "警告",
  //           content: '密码或账号错误',
  //         })
  //       }
  //   })   
  // },
    /**
     * 页面的初始数据
     */
    data: {
      pwd:'',
      name:'',
      isGood:false,
      loginV:false,
      _checked:false,
      _login:false
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