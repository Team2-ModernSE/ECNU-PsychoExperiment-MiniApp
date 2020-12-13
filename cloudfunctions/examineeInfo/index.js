const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
var $ = db.command.aggregate

exports.main = async (event, context) => {
  return db.collection('order').aggregate()
      .match({
        expId: event.expId
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
        examineeInfo: 0
      })
      .end({
        success: function(res){
          return res
        },
        fail: function(err){
          return err
        }
      })
}