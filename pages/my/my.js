// pages/my/my.js
const app = getApp()
Page({  
  data: {
    userinfo: null
  },
  onShow(){
    const userInfo = app.globalData.userInfo
    this.setData({userinfo:userInfo})
  }
})