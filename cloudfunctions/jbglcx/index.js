// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // env:'tsgl-4gpqt9omb33f4369'
  env:'cloud1-5gnbg2zy6247a86d'
})
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    return await db.collection('jdjb').aggregate()
    .lookup({
      from:'tsgzw',
      localField:'jbzw',
      foreignField:'_id',
      as:'zwlist'
    })
    .end()
}