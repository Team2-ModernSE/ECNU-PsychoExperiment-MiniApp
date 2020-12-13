// pages/order/released.js
const app=getApp()
const db=wx.cloud.database()
var formater=require("../../utils/formatTime")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"进行中",
        isActive: true
      },
      {
        id:1,
        value:"已关闭",
        isActive: false
      }
    ],
    index: 0,
    ongoingExperiments: [],
    stoppedExperiments: [],
  },

  onShow(options) {
    db.collection('experiment').where({
      examinerId: app.globalData.openid
    })
    .get({
      success: res=> {
        var myOngoingExperiments=new Array()
        var myStoppedExperiments=new Array()
        for(var item of res.data){
          item.date=formater.formatTime(item.date,'Y-M-D h:m')
          if(item.isActive){
            myOngoingExperiments.push(item)
          }
          else{
            myStoppedExperiments.push(item)
          }
        }
        this.setData({
          ongoingExperiments: myOngoingExperiments,
          stoppedExperiments: myStoppedExperiments
        })
      }
    })
  },

  onReady(){

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

  convertTime(date){
    return formater.formatTime(date,"Y-M-D h:m")
  },

  cardTap(e){
    if(this.data.index==0){
      wx.navigateTo({
        url: '../../pages/expInfo2/expInfo2?id='+this.data.ongoingExperiments[e.currentTarget.id]._id,
      })
    }
    else{
      wx.navigateTo({
        url: '../../pages/expInfo2/expInfo2?id='+this.data.stoppedExperiments[e.currentTarget.id]._id,
      })
    }
  }
})