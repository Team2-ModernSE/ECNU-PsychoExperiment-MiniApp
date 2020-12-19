//app.js
App({
  towxml:require('/towxml/index'),
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'ecnubszm-5g5y43ob65fbb01b',
        traceUser: true,
      })
    }
    this.globalData = {
      openid: null,
      userInfo: null,
      userDetail: null
    }
  }
})
