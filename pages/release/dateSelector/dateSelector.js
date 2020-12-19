// pages/dateSelector/dateSelector.js
import plugin from '../../../components/calendar/plugins/index'
import selectable from '../../../components/calendar/plugins/selectable'

var formater=require("../../../utils/formatTime")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarConfig: {
      multi: true,
      theme: 'default',
      markToday: '今',
      disableMode: {
        type: 'before',
      },
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    plugin.use(selectable)
  },

  afterCalendarRender: function(e){
    const calendar = this.selectComponent('#calendar').calendar
    var date=new Date()
    var endDate=formater.formatTime(new Date(date.setDate(date.getDate()+30)),'Y-M-D')
    var startDate=formater.formatTime(new Date(),'Y-M-D')
    calendar.enableArea([startDate,endDate])
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

  confirmTap: function () {
    const calendar = this.selectComponent('#calendar').calendar
    const res = calendar.getSelectedDates()
    var resArray = new Array()
    for (var item of res) {
      var pushedItem = new Date(item.year + '/' + item.month + '/' + item.date + ' 23:59:59')
      resArray.push(pushedItem)
    }
    resArray.sort(function (a, b) {
      return a - b
    })
    wx.setStorage({
      data: resArray,
      key: 'expDate',
      success: res=>{
        wx.showModal({
          title: '提示',
          content: '日期选择成功',
          showCancel: false,
          confirmText: '返回',
          success: res=>{
            wx.navigateBack({
              delta: 1,
            })
          }
        })
      }
    })
  }
})