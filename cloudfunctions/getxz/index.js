// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // env:'tsgl-4gpqt9omb33f4369'
  env:'cloud1-5gnbg2zy6247a86d'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var text = event.openid
  return await db.collection('xzxx').aggregate().match({openid:text})
  // 将输入记录的一个字段和被连接集合的一个字段进行相等匹配时（即合并数据库）
  .lookup({
    from:'tsgzw',//要连接的集合名
    localField:'zxzw',//输入记录的要进行相等匹配的字段
    foreignField:'_id',//被连接集合的要进行相等匹配的字段
    as:'zwList'//输出的数组字段名
  }) 
  .sort({
    _updateTime: -1 // 倒序
  })
  .end()
}