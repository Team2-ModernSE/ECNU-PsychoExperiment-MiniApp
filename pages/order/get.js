// pages/order/get.js
const app=getApp()
var formater=require("../../utils/formatTime")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusList: ['未处理', '已通过', '已拒绝'],
    unprocessedList: [],
    acceptedList: [],
    refusedList: [],
    tabs:[
      {
        id:0,
        value:"待处理",
        isActive: true
      },
      {
        id:1,
        value:"已同意",
        isActive: false
      },{
        id:2,
        value:"已拒绝",
        isActive: false
      }
    ],
    index: 0,
  },

  onShow(options) {
    var that=this
    wx.cloud.callFunction({
      name: 'orederToExpInfo',
      data: {
        examineeId: app.globalData.openid
      },
      success: function(res){
        var myUnprocessedList = new Array()
        var myAcceptedList = new Array()
        var myRefusedList = new Array()
        for (var item of res.result.list) {
          item.date=formater.formatTime(item.date,'Y-M-D h:m')
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
      }
    })
    
  },

//标题点击事件
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

  cardTap(e){
    if (this.data.index == 0) {
      wx.navigateTo({
        url: '../../pages/expInfo3/expInfo3?id='+this.data.unprocessedList[e.currentTarget.id].expId
      })
    }
    else if(this.data.index==1){
      wx.navigateTo({
        url: '../../pages/expInfo3/expInfo3?id='+this.data.acceptedList[e.currentTarget.id].expId
      })
    }
    else{
      wx.navigateTo({
        url: '../../pages/expInfo3/expInfo3?id='+this.data.refusedList[e.currentTarget.id].expId
      })
    }
  }
})