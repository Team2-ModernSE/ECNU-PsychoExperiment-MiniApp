// pages/expInfo2/examineeList/examineeList.js
const app = getApp()
const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    statusList: ['未处理', '已通过', '已拒绝'],
    unprocessedList: [],
    acceptedList: [],
    refusedList: [],
    tabs: [{
        id: 0,
        value: "未处理",
        isActive: true
      },
      {
        id: 1,
        value: "已同意",
        isActive: false
      },
      {
        id: 1,
        value: "已拒绝",
        isActive: false
      }
    ],
    index: 0,
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
    var that = this
    wx.cloud.callFunction({
      name: 'examineeInfo',
      data: {
        expId: this.data.id,
      },
      success: function (res) {
        var myUnprocessedList = new Array()
        var myAcceptedList = new Array()
        var myRefusedList = new Array()
        for (var item of res.result.list) {
          if (item.isAccepted == "0") {
            myUnprocessedList.push(item)
          } else if (item.isAccepted == "1") {
            myAcceptedList.push(item)
          } else if (item.isAccepted == "2") {
            myRefusedList.push(item)
          }
        }
        that.setData({
          unprocessedList: myUnprocessedList,
          acceptedList: myAcceptedList,
          refusedList: myRefusedList
        })
      },
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

  handleTabsItemChange(e){
    //获取被点击事件的标题
    const myIndex=e.detail.index;
    //修改源数组
    let myTabs=this.data.tabs;
    myTabs.forEach((v,i)=>i==myIndex?v.isActive=true:v.isActive=false);
    this.setData({
      tabs:myTabs,
      index:myIndex
    });
  },

  cardTap: function (e) {
    if (this.data.index == 0) {
      wx.setStorage({
        key: 'examineeInfo',
        data: this.data.unprocessedList[e.currentTarget.id]
      })
      wx.navigateTo({
        url: 'examineeInfo/examineeInfo'
      })
    }
    else if(this.data.index==1){
      wx.setStorage({
        key: 'examineeInfo',
        data: this.data.acceptedList[e.currentTarget.id]
      })
      wx.navigateTo({
        url: 'examineeInfo/examineeInfo'
      })
    }
    else{
      wx.setStorage({
        key: 'examineeInfo',
        data: this.data.refusedList[e.currentTarget.id]
      })
      wx.navigateTo({
        url: 'examineeInfo/examineeInfo'
      })
    }
  }
})