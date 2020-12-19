// pages/home/home.js
const app = getApp();
const db = wx.cloud.database();
const DEFAULT_PAGE = 0;
var formater=require("../../utils/formatTime")

Page({

  /**
   * 页面的初始数据
   */
  startPageX: 0,
  currentView: DEFAULT_PAGE,
  data: {
    imgUrls: [
      '/images/scene1.jpeg',
      '/images/scene2.jpg',
      '/images/scene3.jpg'
    ],
    toView: `card_${DEFAULT_PAGE}`,
    list: ['Javascript', 'Typescript', 'Java', 'PHP', 'Go'],
    isExaminer: false,
    recentExpList: [],
    unprocessedList: [],
    postList: []
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
        wx.getSetting({
          success: res=> {
            if (res.authSetting['scope.userInfo']) { //如果已经授权
              wx.getUserInfo({
                success: res => {
                  app.globalData.userInfo = res.userInfo;
                  db.collection('user').where({ //检测用户的openid是否在数据库中
                      _openid: app.globalData.openid
                    })
                    .get({
                      success: res => {
                        if (!res.data.length) { //openid不在数据库中
                          wx.redirectTo({ //跳转到注册页面
                            url: '../../pages/register/register',
                          })
                        } else {
                          app.globalData.userDetail = res.data[0]
                          this.setData({
                            isExaminer: res.data[0].isExaminer
                          })
                        }
                      }
                    })
                }
              })
            } else { //未授权，跳转到授权页面
              wx.redirectTo({
                url: '../../pages/auth/auth',
              })
            }
          },
        })
      }
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
    if (app.globalData.userDetail == null) {
      db.collection('user').where({ //检测用户的openid是否在数据库中
          _openid: app.globalData.openid
        })
        .get({
          success: res=>{
            app.globalData.userDetail = res.data[0]
            this.setData({
              isExaminer: res.data[0].isExaminer
            })
          }
        })
    }
    else{
      var detail=app.globalData.userDetail
      this.setData({
        isExaminer: detail.isExaminer
      })
    }
    db.collection('post').where({
      isVisible: true
    })
    .get({
      success: res=>{
        this.setData({
          postList: res.data
        })
      }
    })
    var that=this
    wx.cloud.callFunction({
      name: 'orederToExpInfo',
      data:{},
      success: res=>{
        var date=new Date()
        date=date.setDate(date.getDate()+6)
        date=new Date(date)
        var myRecentExpList=new Array()
        for(var item of res.result.list){
          if((new Date(item.examineeSelectedDate))<date&&item.isAccepted=='1'){
            (item.examineeSelectedDate)=formater.formatTime(item.examineeSelectedDate,'Y-M-D')
            myRecentExpList.push(item)
          }
        }
        that.setData({
          recentExpList: myRecentExpList
        })
      }
    })
    wx.cloud.callFunction({
      name: 'getUnprocessedRequest',
      data:{},
      success: res=>{
        for(var i in res.result.list){
          (res.result.list[i]).examineeSelectedDate=formater.formatTime((res.result.list[i]).examineeSelectedDate,'Y-M-D')
        }
        that.setData({
          unprocessedList:res.result.list
        })
      }
    })
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

  touchStart(e) {
    this.startPageX = e.changedTouches[0].pageX;
  },

  touchEnd(e) {
    const moveX = e.changedTouches[0].pageX - this.startPageX;
    const maxPage = this.data.list.length - 1;
    if (Math.abs(moveX) >= 150){
      if (moveX > 0) {
        this.currentView = this.currentView !== 0 ? this.currentView - 1 : 0;
      } else {
        this.currentView = this.currentView !== maxPage ? this.currentView + 1 : maxPage;
      }
    }
    this.setData({
      toView: `card_${this.currentView}`
    });
  },
  expTap(e){
    wx.navigateTo({
      url: '../../pages/expInfo3/expInfo3?id='+this.data.recentExpList[e.currentTarget.id].expId
    })
  },
  requestTap(e){
    wx.navigateTo({
      url: '../../pages/expInfo2/examineeList/examineeList?id='+this.data.unprocessedList[e.currentTarget.id].expId
    })
  },
  newsTap(e){
    wx.setStorage({
      data: this.data.postList[e.currentTarget.id.slice(5)],
      key: 'postInfo',
    })
    wx.navigateTo({
      url: 'post/post',
    })
  },
})