// pages/expInfo3/expInfo3.js
const db=wx.cloud.database()
var formater=require("../../utils/formatTime")
const app=getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    gender: '',
    date: '',
    time: '',
    location: '',
    duration: '',
    money: '',
    contact: '',
    others: '',
    examineeContact: '',
    examineeOthers: '',
    statusIndex: 0,
    statusArray: ['处理中','已同意','已拒绝']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
    db.collection('experiment').where({
      _id: this.data.id
    })
    .get({
      success: res=>{
        this.setData({
          name: res.data[0].name,
          gender: res.data[0].sex,
          date: formater.formatTime(res.data[0].date,"Y-M-D"),
          time: formater.formatTime(res.data[0].date,"h:m"),
          duration: res.data[0].time+"分钟",
          location: res.data[0].location,
          money: res.data[0].money + "元",
          contact: res.data[0].contact,
          others: res.data[0].others,
        })
      }
    })
    db.collection('order').where({
      expId: this.data.id,
      examineeId: app.globalData.openid
    })
    .get({
      success: res=>{
        this.setData({
          examineeContact: res.data[0].contact,
          examineeOthers: res.data[0].others,
          statusIndex: res.data[0].isAccepted
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