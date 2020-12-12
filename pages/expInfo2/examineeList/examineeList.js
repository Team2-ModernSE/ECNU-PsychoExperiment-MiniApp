// pages/expInfo2/examineeList/examineeList.js
const app=getApp()
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    detailList:[],
    statusList:['未处理','已通过','已拒绝']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
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
    db.collection('order').where({
      expId: this.data.id,
    })
    .get({
      success: res=>{
        this.setData({
          detailList: res.data,
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
  cardTap:function(e){
    wx.setStorage({
      key: 'examineeInfo',
      data: this.data.detailList[e.currentTarget.id]
    })
    wx.navigateTo({
      url: 'examineeInfo/examineeInfo'
    })
  }
})