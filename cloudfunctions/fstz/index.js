// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid, //要推送给那个用户
      page: 'pages/index/index', //要跳转到那个小程序页面
      data: {//推送的内容
        time5: {
          value: event.time
        },
        phrase6: {
          value: event.wz
        },
        date4: {
          value: event.sj
        },
        thing14: {
          value: event.bh
        },
        time23: {
          value: event.xzsjd
        },
      },
      templateId: 'YghafEHLxELYPBhw2RGes01ijkwyi5po5Xrg' //模板id
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}