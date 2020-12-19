// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
var $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return db.collection('order').aggregate()
    .match({
      examinerId: wxContext.OPENID,
      isAccepted: "0"
    })
    .lookup({
      from: 'experiment',
      localField: 'expId',
      foreignField: '_id',
      as: 'expInfo'
    })
    .replaceRoot({
      newRoot: $.mergeObjects([$.arrayElemAt(['$expInfo', 0]), '$$ROOT'])
    })
    .lookup({
      from: 'user',
      localField: 'examineeId',
      foreignField: '_openid',
      as: 'examineeInfo'
    })
    .replaceRoot({
      newRoot: $.mergeObjects([$.arrayElemAt(['$examineeInfo', 0]), '$$ROOT'])
    })
    .project({
      expInfo: 0
    })
    .end({
      success: function (res) {
        return res
      },
      fail: function (err) {
        return err
      }
    })
}