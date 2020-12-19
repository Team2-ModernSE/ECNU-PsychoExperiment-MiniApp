// pages/expInfo2/expInfo2.js
const db = wx.cloud.database()
const _ = db.command
const app = getApp()
var formater = require("../../utils/formatTime")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    name: '',
    gender: '',
    expireDate: '',
    availableDate: [],
    duration: '',
    location: '',
    money: '',
    contact: '',
    others: '',
    isActive: false,
    statusIndex: 0,
    statusArray: ['进行中', '已关闭'],
    availableDateStr: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    db.collection('experiment').where({
        _id: this.data.id
      })
      .get({
        success: res => {
          this.setData({
            name: res.data[0].name,
            gender: res.data[0].sex,
            expireDate: formater.formatTime(res.data[0].expireDate, "Y-M-D"),
            availableDate: res.data[0].availableDate,
            duration: res.data[0].time + "分钟",
            location: res.data[0].location,
            money: res.data[0].money + "元",
            contact: res.data[0].contact,
            others: res.data[0].others,
            isActive: res.data[0].isActive,
            statusIndex: res.data[0].isActive ? 0 : 1
          })
          var myAvailableDateStr = ""
          for (var i in this.data.availableDate) {
            if (i != (this.data.availableDate).length - 1)
              myAvailableDateStr += (formater.formatTime(this.data.availableDate[i], "Y-M-D")+'\n')
            else
              myAvailableDateStr += formater.formatTime(this.data.availableDate[i], "Y-M-D")
          }
          this.setData({
            availableDateStr: myAvailableDateStr
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

  },

  bindStatusChange: function (e) {
    this.setData({
      statusIndex: e.detail.value
    })
  },

  submitTap: function () {
    var submitStatus = (this.data.statusIndex == 0) ? true : false
    db.collection('experiment').where({
        _id: this.data.id
      })
      .update({
        data: {
          isActive: submitStatus
        },
        success: res => {
          wx.showModal({ //弹出提示框
            title: '提示',
            content: '更新成功',
            showCancel: false,
            confirmText: '确定',
          })
        },
        fail: res=> {
          wx.showModal({ //弹出提示框
            title: '提示',
            content: '更新失败',
            showCancel: false,
            confirmText: '确定',
          })
        }
      })
  }
})