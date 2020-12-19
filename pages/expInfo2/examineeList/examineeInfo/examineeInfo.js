// pages/expInfo2/examineeList/examineeInfo/examineeInfo.js
var formater=require("../../../../utils/formatTime")

const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    gender: '',
    stuNumber: '',
    contact: '',
    others: '',
    statusIndex: 0,
    statusArray: ['待定','已通过','已拒绝'],
    comment: '',
    selectedDate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'examineeInfo',
      success: res=>{
        this.setData({
          id: res.data._id,
          name: res.data.name,
          gender: res.data.gender,
          stuNumber: res.data.stuNumber,
          contact: res.data.contact,
          others: res.data.others,
          statusIndex: res.data.isAccepted,
          selectedDate: formater.formatTime(res.data.examineeSelectedDate,'Y-M-D'),
          comment: res.data.comment
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
  commentInput: function(e) {
    this.setData({
      comment: e.detail.value
    })
  },
  submitTap: function(){
    db.collection('order').where({
      _id: this.data.id
    }).update({
      data:{
        isAccepted: this.data.statusIndex,
        comment: this.data.comment
      },
      success: function(){
        wx.showModal({ //弹出提示框
          title: '提示',
          content: '提交成功',
          showCancel: false,
          confirmText: '返回',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        });
      }
    })
  }
})