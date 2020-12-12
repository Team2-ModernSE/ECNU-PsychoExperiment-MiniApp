// pages/auth.js
const app=getApp()
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  },
  bindGetUserInfo: function (res) {
    if (res.detail.userInfo) {
      //授权成功后，检查用户的openid是否在数据库中
      db.collection('user').where({  
        _openid: app.globalData.openid
      })
      .get({
        success: function(res){
          if(!res.data.length){  //如果没有找到数据，则跳转到注册页面
            wx.redirectTo({
              url: '../../pages/register/register',
            })
          }
          else{    //找到数据，跳转到主页
            wx.switchTab({
              url: "../../pages/home/home",
            })
          }
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '注意',
        content: '您需要授权以继续使用本程序',
        showCancel: false,
        confirmText: '返回授权',
      });
    }
  }
})