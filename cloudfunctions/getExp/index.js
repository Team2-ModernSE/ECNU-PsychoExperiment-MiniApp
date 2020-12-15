// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = _.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return db.collection('experiment').aggregate()
    .lookup({
      from: 'order',
      localField: '_id',
      foreignField: 'expId',
      as: 'orderInfo'
    })
    .match({
      isActive: true,
      orderInfo: _.or($.cond([
          _.elemMatch({
            examineeId: wxContext.OPENID
          }),
          false,
          true
        ],
      ),_.size(0))
    })
    .project({
      orderInfo: 0
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