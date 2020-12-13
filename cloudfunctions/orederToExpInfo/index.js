const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
var $ = db.command.aggregate

exports.main = async (event, context) => {
  return db.collection('order').aggregate()
    .match({
      examineeId: event.examineeId
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