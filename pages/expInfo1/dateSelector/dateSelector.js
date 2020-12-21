// pages/expInfo1/dateSelector/dateSelector.js
import plugin from '../../../components/calendar/plugins/index'
import selectable from '../../../components/calendar/plugins/selectable'

var formater=require("../../../utils/formatTime")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarConfig: {
      theme: 'default',
      markToday: '今',
    }
  },

  afterCalendarRender: function(e){
    const calendar = this.selectComponent('#calendar').calendar
    wx.getStorage({
      key: 'examineeAvailableDate',
      success: res=>{
        var shownDate=new Array()
        for(var i in res.data){
          var date=new Date(res.data[i]);
          if(date>=new Date()){
            shownDate.push(formater.formatTime(date,'Y-M-D'))
          }
        }
        calendar.enableDates(shownDate)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    plugin.use(selectable)
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

  confirmTap: function(e){
    const calendar = this.selectComponent('#calendar').calendar
    const res = calendar.getSelectedDates()
    var selectedDate=new Date(res[0].year + '/' + res[0].month + '/' + res[0].date + ' 23:59:59')
    wx.setStorage({
      data: selectedDate,
      key: 'examineeSelectedDate',
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