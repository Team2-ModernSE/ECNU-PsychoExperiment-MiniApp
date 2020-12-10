// pages/home/home.js
const app=getApp();
const db=wx.cloud.database();

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
    wx.cloud.callFunction({ //获取openid
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        console.log(app.globalData.openid)
      }
    })
    wx.getSetting({
      success: function (res) {
        console.log(res.authSetting['scope.userInfo'])  //检测是否授权
        if(res.authSetting['scope.userInfo']){  //如果已经授权
          wx.getUserInfo({ 
            success: res=> {
              console.log(res.userInfo)
              app.globalData.userInfo = res.userInfo;
              db.collection('user').where({  //检测用户的openid是否在数据库中
                _openid: app.globalData.openid
              })
              .get({
                success: function(res){
                  console.log(res)
<<<<<<< Updated upstream
                  if(!res.data.length){  //openid不在数据库中
=======
                  /*if(!res.data.length){
>>>>>>> Stashed changes
                    console.log('fail')
                    wx.redirectTo({  //跳转到注册页面
                      url: '../../pages/register/register',
                    })
                  }*/
                }
              })
            }
          })
        }
        else{  //未授权，跳转到授权页面
          console.log('fail')
          wx.redirectTo({
            url: '../../pages/auth/auth',
          })
        }
      },
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

  }
})